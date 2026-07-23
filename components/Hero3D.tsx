"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("./three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse-glow rounded-full bg-gradient-to-br from-ember/30 to-ice/30 blur-3xl" />
    </div>
  ),
});

export function Hero3D() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setReady(true);
    };

    const fallback = window.setTimeout(start, 15000);
    window.addEventListener("pointermove", start, { once: true, passive: true });
    window.addEventListener("touchstart", start, { once: true, passive: true });
    window.addEventListener("scroll", start, { once: true, passive: true });

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("pointermove", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("scroll", start);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_78%_58%,rgba(255,90,31,0.18),transparent_34%)]" />
      {ready ? <HeroCanvas /> : null}
    </div>
  );
}
