"use client";

import React, { useEffect, useRef } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiPrisma,
  SiPostgresql,
} from "react-icons/si";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
  useInView,
} from "framer-motion";

const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

const stackItems = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Prisma", icon: SiPrisma, color: "#48B47E" },
];

const Stack = () => {
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
    radial-gradient(125% 125% at 50% 100%, #000 50%, ${color})
  `;

  // OBSERWACJA NAGŁÓWKÓW (powtarzalna animacja)
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const devRef = useRef<HTMLHeadingElement | null>(null);

  const titleInView = useInView(titleRef, { amount: 0.5 });
  const devInView = useInView(devRef, { amount: 0.5 });

  return (
    <motion.section
      id="stack"
      aria-label="Tech stack – technologie, w których pracuję"
      style={{ backgroundImage }}
      className="py-32 px-4 text-white"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Tech Stack — z lewej */}
        <motion.h2
          ref={titleRef}
          animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-4 text-left mx-auto max-w-4xl"
        >
          Tech <span className="text-blue-300">Stack</span>
        </motion.h2>

        <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto mb-12 text-left">
          Łączę development aplikacji webowych z administracją serwerami i
          nowoczesnym podejściem DevOps. Poniżej technologie, narzędzia i
          procesy, z których korzystam na co dzień.
        </p>

        {/* Separator */}
        <div className="relative my-10 md:my-14 flex justify-center">
          <div className="w-full max-w-4xl h-px bg-white/10" />
          <div className="absolute inset-0 mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-md" />
        </div>

        {/* Technologie developerskie — z prawej */}
        <motion.h3
          ref={devRef}
          animate={devInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl"
        >
          Technologie <span className="text-blue-300">developerskie</span>
        </motion.h3>

        <p className="text-gray-300 max-w-3xl mx-auto text-left mb-10 text-sm md:text-base">
          Technologie, których używam do tworzenia nowoczesnych, szybkich i
          skalowalnych aplikacji webowych.
        </p>

        {/* KAFELKI */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stackItems.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-xl border border-slate-800 bg-slate-950/10 backdrop-blur-md transition-all shadow shadow-blue-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  {/* ŻYWY, NIEBIESKI GLOW – TEN SAM DLA KAŻDEJ IKONY */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-lg shadow-sm shadow-blue-500" />
                  </div>

                  {/* IKONA */}
                  <div className="relative p-3 rounded-xl border border-slate-800 bg-black/40">
                    <item.icon
                      className="w-8 h-8"
                      style={{
                        color: item.color,
                      }}
                    />
                  </div>
                </div>

                <h4 className="text-xl font-semibold leading-snug text-center">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Stack;
