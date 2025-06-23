import React, { Suspense, useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Environment, useTexture } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { BufferAttribute, Points as ThreePoints, PointsMaterial, Color, Vector3 } from 'three';
import { useTheme } from '@/context/ThemeContext';

// Particle system with theme-aware colors and 3D effects
function Particles() {
  const particlesRef = useRef<ThreePoints>(null);
  const { theme } = useTheme();
  const { viewport } = useThree();
  
  // Generate points in a sphere with some noise
  const [sphere, colors] = useMemo(() => {
    const count = 5000; // Reduced for better performance
    const positions = random.inSphere(new Float32Array(count * 3), { 
      radius: 2.5,
      type: 'sphere'
    });
    
    // Create color array based on theme
    const colors = new Float32Array(count * 3);
    const isDark = theme === 'dark';
    
    for (let i = 0; i < count; i++) {
      // For dark theme: white to light gray, for light: dark gray to black
      const baseIntensity = isDark ? 0.8 : 0.2;
      const variation = isDark ? 0.2 : 0.1;
      const intensity = baseIntensity + Math.random() * variation;
      
      colors[i * 3] = intensity;     // R
      colors[i * 3 + 1] = intensity; // G
      colors[i * 3 + 2] = intensity; // B
    }
    
    return [
      new BufferAttribute(positions, 3),
      new BufferAttribute(colors, 3)
    ];
  }, [theme]);
  
  // Smooth animations
  useFrame(({ clock, mouse }) => {
    if (particlesRef.current) {
      // Gentle rotation
      const time = clock.getElapsedTime();
      particlesRef.current.rotation.x = time * 0.02;
      particlesRef.current.rotation.y = time * 0.01;
      
      // Subtle movement based on mouse position
      if (mouse) {
        particlesRef.current.rotation.x += (mouse.y * 0.5 - particlesRef.current.rotation.x) * 0.01;
        particlesRef.current.rotation.y += (-mouse.x * 0.5 - particlesRef.current.rotation.y) * 0.01;
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          array={sphere.array}
          count={sphere.count}
          itemSize={3}
        />
        <bufferAttribute 
          attach="attributes-color" 
          array={colors.array}
          count={colors.count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={theme === 'dark' ? 0.008 : 0.006}
        sizeAttenuation={true}
        transparent
        opacity={theme === 'dark' ? 0.5 : 0.4}
        depthWrite={false}
        alphaTest={0.01}
      />
    </points>
  );
}

/**
 * BackgroundCanvas renders a full-screen WebGL particle system with theme support.
 * Features subtle 3D animations and responds to system theme changes.
 */
export default function BackgroundCanvas() {
  const { theme } = useTheme();
  
  return (
    <Canvas
      frameloop="always"
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false
      }}
      camera={{
        position: [0, 0, 5],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: theme === 'dark' ? '#0a0a0a' : '#f8f8f8',
        transition: 'background 0.5s ease',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(theme === 'dark' ? 0x0a0a0a : 0xf8f8f8, 1);
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={theme === 'dark' ? 0.8 : 1.2} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={theme === 'dark' ? 0.8 : 0.6}
          color={theme === 'dark' ? '#ffffff' : '#333333'}
        />
        <Particles />
        <Environment 
          preset={theme === 'dark' ? 'night' : 'city'}
          background={false}
          blur={0.8}
        />
      </Suspense>
    </Canvas>
  );
}
