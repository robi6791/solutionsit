"use client";

import React, { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { FiArrowRight, FiGithub, FiMail } from "react-icons/fi";
import Image from "next/image";
import profilepic from "@/public/images/profile2.png";
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
  }, [color]);

  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})
  `;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-screen flex items-center justify-between"
      aria-label="Sekcja wprowadzająca – freelancer IT, fullstack developer, DevOps"
    >
      {/* Gwiazdy */}
      <div className="absolute z-0 inset-0">
        <Canvas>
          <Stars radius={50} count={500} factor={3} fade speed={5} />
        </Canvas>
      </div>

      <div className="z-10 text-white max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4">
        {/* LEWA KOLUMNA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center md:items-start"
        >
          {/* Pasek statusu */}
          <p className="bg-sky-400/40 px-3 py-1 mb-2 mt-8 border border-sky-700/40 rounded-lg font-semibold text-xs md:text-sm">
            Freelancer IT · Fullstack Developer · DevOps
          </p>

          <p className="text-xl md:text-5xl font-bold text-center md:text-left">
            Cześć, jestem{" "}
            <span className="bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">
              Robert
            </span>
          </p>

          <p className="mt-3 max-w-[460px] text-sm md:text-base text-gray-200 px-1 text-center md:text-left">
            Łączę serwis komputerowy, elektronikę, administrację serwerami i
            development full-stack. Wspieram firmy oraz klientów indywidualnych
            w tworzeniu stabilnych, nowoczesnych i dobrze zoptymalizowanych
            rozwiązań IT.
          </p>

          <p className="mt-2 max-w-[460px] text-sm md:text-base text-gray-300 px-1 text-center md:text-left italic">
            Zaczynałem od elektroniki i napraw sprzętu, a dziś łączę to z
            developmentem i DevOps — dzięki czemu ogarniam projekt end-to-end:
            od hardware po wdrożenie aplikacji.
          </p>

          {/* 🔥 Nowy układ CTA: ikony + jeden button */}
          <div className="mt-6 flex gap-6 items-center flex-wrap">
            {/* Ikona koperty */}
            <motion.button
              onClick={() =>
                window.dispatchEvent(new Event("open-contact-modal"))
              }
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{ border, boxShadow }}
              className="p-3 rounded-full bg-black/20 text-white hover:text-sky-400 transition hover:cursor-pointer"
              aria-label="Otwórz formularz kontaktowy"
            >
              <FiMail className="text-xl" />
            </motion.button>

            {/* Ikona GitHub */}
            <motion.button
              onClick={() =>
                window.open("https://github.com/robi6791", "_blank")
              }
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{ border, boxShadow }}
              className="p-3 rounded-full bg-black/20 text-white hover:text-sky-400 transition hover:cursor-pointer"
              aria-label="Przejdź do mojego GitHuba"
            >
              <FiGithub className="text-xl" />
            </motion.button>

            {/* Przycisk "Zobacz projekty" */}
            <motion.button
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm border border-white/30 hover:border-sky-400 hover:text-sky-400 hover:cursor-pointer transition bg-black/10 font-medium"
            >
              Zobacz projekty <FiArrowRight />
            </motion.button>
          </div>
        </motion.div>

        {/* PRAWA KOLUMNA */}
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

          <div className="relative">
            <Image
              src={profilepic}
              alt="Robert Senenko – freelancer IT i fullstack developer"
              width={220}
              height={220}
              className="rounded-full border border-sky-500/40 shadow-lg"
              priority
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-2 -right-2 
                bg-gradient-to-r from-cyan-400 to-indigo-500 
                text-white font-extrabold text-xs md:text-sm 
                px-4 py-2 rounded-full 
                shadow-[0_0_15px_rgba(0,255,255,0.7)]"
            >
              IT · Dev · DevOps
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
