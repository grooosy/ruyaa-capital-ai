"use client"

// ParticleBackground renders a subtle animated particle effect used on all pages
// to provide an AI-inspired atmosphere without distracting from content.

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import type { Container, ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

const ParticleBackground = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // You can add any logic here for when particles are loaded.
  }

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
            mode: "attract",
          },
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            factor: 1,
          },
        },
      },
      particles: {
        color: {
          value: ["#3b82f6", "#06b6d4", "#8b5cf6", "#ffffff"],
        },
        links: {
          color: "#3b82f6",
          distance: 150,
          enable: true,
          opacity: 0.02,
          width: 0.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 0.1,
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
          value: { min: 0.01, max: 0.05 },
          animation: {
            enable: true,
            speed: 0.3,
            minimumValue: 0.01,
            sync: false,
          },
        },
        shape: {
          type: ["circle", "triangle", "square"],
        },
        size: {
          value: { min: 0.5, max: 1 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.5,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 -z-10"
      />
    )
  }

  return <></>
}

export default ParticleBackground
