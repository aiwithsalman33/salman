"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; onError: () => void };

/** A 3D failure must never take the page down: render nothing and let the static fallback show. */
export class SceneErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
