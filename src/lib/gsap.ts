"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once; every client component imports GSAP from here.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
