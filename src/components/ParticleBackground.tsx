"use client";

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
    // Particle system loaded callback
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
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "connect",
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 0.4,
          },
          connect: {
            distance: 150,
            links: {
              opacity: 0.3,
            },
            radius: 60,
          },
        },
      },
      particles: {
        color: {
          value: ["#f5c518", "#f5c518", "#e6e6e6"],
        },
        links: {
          color: "#f5c518",
          distance: 120,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 2000,
          },
          value: 50,
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
          }
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
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
        id="ai-particles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="fixed inset-0 -z-20 pointer-events-none"
      />
    );
  }

  return null;
};

export default ParticleBackground;