"use client"
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";


const SmoothScroll = () => {
  const lenisRef = useRef(null);
  useEffect(() => {
    lenisRef.current = new Lenis({
      smoothWheel: true,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);
  return (
    <>
    </>
  )
}

export default SmoothScroll