"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -80 } });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (pct >= 0.9 && !(window as unknown as { __s90?: boolean }).__s90) {
        (window as unknown as { __s90?: boolean }).__s90 = true;
        const w = window as unknown as { ym?: (id: number, a: string, g: string) => void };
        const id = Number(process.env.NEXT_PUBLIC_YM_ID);
        if (w.ym && id) w.ym(id, "reachGoal", "scroll_90");
      }
    };
    lenis.on("scroll", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
