"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const VantaBackground = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaRef.current && divRef.current) {
      vantaRef.current = NET({
        el: divRef.current,
        THREE,
        color: 0xffffff,
        backgroundColor: 0x0d0d0d,
        points: 12.0,
        maxDistance: 20.0,
        spacing: 15.0,
      });
    }
    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);

  return <div ref={divRef} className="absolute inset-0 -z-10" />;
};

export default VantaBackground;
