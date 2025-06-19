"use client";

// ParticleBackground renders a subtle animated particle effect used on all pages
// to provide a modern dark atmosphere without distracting from content.

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
          value: ["#FFD700", "#FFA500", "#ffffff"],
        },
        links: {
          color: "#FFD700",
          distance: 120,
          enable: true,
          opacity: 0.03,
          width: 0.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1500,
          },
          value: 60,
        },
        opacity: {
          value: { min: 0.02, max: 0.1 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.02,
            sync: false
          }
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 0.3, max: 1 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.3,
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