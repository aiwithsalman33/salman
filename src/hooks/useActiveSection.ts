"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section crossing the middle of the viewport. `ids` must be a stable array. */
export function useActiveSection<T extends string>(ids: readonly T[]): T {
  const [active, setActive] = useState<T>(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as T);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
