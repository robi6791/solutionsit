"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three"; // ✅ typy do refa
import React, { useRef } from "react";
import { motion } from "framer-motion";

export const GitHubGalaxyOrb = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.open("https://github.com/robi6791", "_blank")}
      className="w-20 h-20 cursor-pointer"
    >
      <Canvas camera={{ position: [0, 0, 3] }}>
        <GalaxyOrbMesh />
      </Canvas>
    </motion.div>
  );
};

const GalaxyOrbMesh = () => {
  // ✅ zamiast any dajemy konkretny Mesh ze SphereGeometry + MeshStandardMaterial
  const ref = useRef<THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshStandardMaterial
  > | null>(null);

  const texture = useLoader(TextureLoader, "/images/github-logo.png");

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    // wolna rotacja
    ref.current.rotation.y = t * 0.35;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;

    // pulsowanie "glow"
    ref.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.25;
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={"#00bfff"}
          emissiveIntensity={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* ambient space light */}
      <ambientLight intensity={0.7} />

      {/* zimne punktowe światło jak w kosmosie */}
      <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
    </>
  );
};
