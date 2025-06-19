
"use client";

// ParticleBackground renders a subtle animated particle effect used on all pages
// to provide an AI-inspired atmosphere without distracting from content.

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // You can add any logic here for when particles are loaded.
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#00d48b", "#b7902b", "#ffffff"],
        },
        links: {
          color: "#00d48b",
          distance: 120,
          enable: true,
          opacity: 0.05,
          width: 0.8,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1200,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.05, max: 0.2 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.05,
            sync: false
          }
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 0.5, max: 1.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.5,
            sync: false
          }
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 -z-10"
      />
    );
  }

  return <></>;
};

export default ParticleBackground;
