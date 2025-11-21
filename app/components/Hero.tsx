"use client";

import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, animate } from "framer-motion";
import Image from "next/image"; // Przywrócono import Next.js Image
import profilepic from "@/public/images/profile2.png"; // Przywrócono oryginalny import obrazu
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]); // Dodano color do zależności

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen flex items-center justify-between"
    >
      <div className="absolute z-0 inset-0">
        <Canvas>
          <Stars radius={50} count={500} factor={2} fade speed={5} />
        </Canvas>
      </div>

      <div className="z-10 text-white max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center md:items-start"
        >
          {/* ZMIANA KOLORU 1: Status dostępności z purpurowego na cyjanowy/niebieski */}
          <p className="bg-sky-400/40 px-3 py-1 mb-1 text-sm border border-sky-700/40 rounded-lg font-semibold">
            Gotowy na nowe projekty
          </p>
          <p className="text-3xl md:text-5xl font-bold">Cześć, jestem</p>
          {/* ZMIANA KOLORU 2: Gradient imienia z purpurowego na cyjanowy */}
          <p className="bg-gradient-to-r from-white to-sky-400 bg-clip-text text-4xl md:text-6xl text-transparent font-bold">
            Robert
          </p>
          <p className="mt-4 max-w-[400px] text-base">
            Tworzę nowoczesne systemy Full Stack. Wiedza zdobyta przy
            zarządzaniu serwerami i naprawach sprzętu pozwala mi projektować
            cyfrowe fundamenty z myślą o maksymalnej stabilności.
          </p>
          <div className="mt-6 flex gap-6">
            <motion.button
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-sm"
            >
              <FiDownload className="text-lg" />
              Download CV
            </motion.button>
            <motion.button
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // ZMIANA KOLORU 3: Hover przycisku na cyjanowy
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm border border-white/30 hover:border-sky-400 hover:text-sky-400 transition"
            >
              Zobacz Projekty
              <FiArrowRight />
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative"
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-40"
            style={{
              background: `radial-gradient(circle, ${COLORS_TOP[0]}, transparent 70%)`,
            }}
          />
          <div>
            <Image
              src={profilepic}
              alt="profile pic"
              width={150} // Zmieniono klasę na okrągły kształt
              className="rounded-full"
              // Dodałem 'priority' dla lepszego ładowania
              priority
            />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              // Zastosowanie mocniejszego gradientu i neonowego cienia
              className="absolute -bottom-2 -right-2 
                         bg-gradient-to-r from-cyan-400 to-indigo-500 
                         text-white font-extrabold text-sm 
                         px-4 py-2 rounded-full 
                         shadow-[0_0_15px_rgba(0,255,255,0.7)] 
                         transition duration-300"
            >
              Developer
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
