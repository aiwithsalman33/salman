"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  EdgesGeometry,
  IcosahedronGeometry,
  MathUtils,
  Vector3,
  type Group,
  type Mesh,
  type ShaderMaterial,
} from "three";
import { sceneState } from "@/lib/sceneBus";
import { anchors, palette, smoothstep } from "../trajectory";
import { getGlowTexture } from "./glowTexture";

type Orbit = { radius: number; rotation: [number, number, number]; speed: number; phase: number };

// Five orbits, one per capability. Node 0 is lime, the rest cyan.
const orbits: readonly Orbit[] = [
  { radius: 2.4, rotation: [1.25, 0, 0.3], speed: 0.25, phase: 0 },
  { radius: 2.0, rotation: [1.0, 0.5, -0.4], speed: -0.32, phase: 2 },
  { radius: 2.9, rotation: [1.4, -0.3, 0.9], speed: 0.18, phase: 4 },
  { radius: 1.7, rotation: [0.4, 0.2, 1.2], speed: 0.4, phase: 1 },
  { radius: 3.3, rotation: [1.5, 0.1, -0.8], speed: -0.12, phase: 5 },
];

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Fresnel rim with a slow pulse: bright edges, translucent centre.
const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
    float pulse = 0.88 + 0.12 * sin(uTime * 1.6);
    vec3 color = uColor * (0.35 + fresnel * 1.4) * pulse;
    gl_FragColor = vec4(color * uIntensity, (0.5 + fresnel * 0.5) * uIntensity);
    #include <colorspace_fragment>
  }
`;

function circle(radius: number, segments = 128) {
  return Array.from({ length: segments }, (_, i) => {
    const a = (i / segments) * Math.PI * 2;
    return new Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
}

/**
 * The intelligence core: inner fresnel sphere, rotating icosahedron shell, glow, and five orbiting
 * capability nodes. It lives at the origin for the intro, then reappears at the beacon for the finale.
 */
export function Core({ dim }: { dim: number }) {
  const group = useRef<Group>(null);
  const shell = useRef<Group>(null);
  const coreMaterial = useRef<ShaderMaterial>(null);
  const nodes = useRef<(Mesh | null)[]>([]);
  const intro = useRef(0);

  const shellGeometry = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(1.1, 1)), []);
  const orbitGeometries = useMemo(() => orbits.map((o) => new BufferGeometry().setFromPoints(circle(o.radius))), []);
  const glow = useMemo(() => getGlowTexture(), []);
  const uniforms = useMemo(
    () => ({ uColor: { value: new Color(palette.signal) }, uTime: { value: 0 }, uIntensity: { value: 0 } }),
    [],
  );

  useEffect(
    () => () => {
      shellGeometry.dispose();
      orbitGeometries.forEach((g) => g.dispose());
    },
    [shellGeometry, orbitGeometries],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = sceneState.t;
    const time = state.clock.elapsedTime;

    // Ignite on first appearance, like the SVG it replaces.
    intro.current = MathUtils.damp(intro.current, 1, 2.2, delta);

    // At the beacon: grows in as the points converge, then shrinks away as the contact form scrolls up.
    const atBeacon = t >= 6;
    const finale = atBeacon ? smoothstep(7.2, 8, t) * (1 - smoothstep(8.25, 8.6, t)) * 0.6 : 1;
    g.position.copy(atBeacon ? anchors.beacon : anchors.core);
    g.scale.setScalar(Math.max(0.0001, finale * (0.82 + 0.18 * intro.current)));
    g.visible = finale > 0.001 && (atBeacon || t < 2.4);

    // Subtle response to the pointer.
    g.rotation.y = MathUtils.damp(g.rotation.y, sceneState.pointer.x * 0.25, 3, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, -sceneState.pointer.y * 0.18, 3, delta);

    if (shell.current) {
      shell.current.rotation.y += delta * 0.15;
      shell.current.rotation.x += delta * 0.06;
    }

    const material = coreMaterial.current;
    if (material) {
      material.uniforms.uTime.value = time;
      material.uniforms.uIntensity.value = intro.current * dim;
    }

    orbits.forEach((o, i) => {
      const a = o.phase + time * o.speed;
      nodes.current[i]?.position.set(Math.cos(a) * o.radius, Math.sin(a) * o.radius, 0);
    });
  });

  return (
    <group ref={group}>
      <sprite scale={[6, 6, 1]}>
        <spriteMaterial map={glow} color={palette.signal} transparent opacity={0.32 * dim} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      <mesh>
        <sphereGeometry args={[0.55, 48, 48]} />
        <shaderMaterial
          ref={coreMaterial}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <group ref={shell}>
        <lineSegments geometry={shellGeometry}>
          <lineBasicMaterial color={palette.signal} transparent opacity={0.55 * dim} />
        </lineSegments>
      </group>
      {orbits.map((o, i) => (
        <group key={i} rotation={o.rotation}>
          <lineLoop geometry={orbitGeometries[i]}>
            <lineBasicMaterial color={palette.steel} transparent opacity={0.22 * dim} />
          </lineLoop>
          <mesh
            ref={(el) => {
              nodes.current[i] = el;
            }}
          >
            <sphereGeometry args={[i === 0 ? 0.09 : 0.07, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? palette.go : palette.signal} transparent opacity={dim} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
