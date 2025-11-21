"use client";

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
} from "framer-motion";
import { useEffect } from "react";

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

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, #000 50%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="py-32 px-4 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-[1200px] mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl text-center font-bold mb-16"
        >
          Tech <span className="text-blue-300">Stack</span>
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stackItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              // Utrzymujemy delikatny efekt hover na kafelku, ale bez wpływu na ikonę
              className="p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 bg-gray-900/40 backdrop-blur-sm"
            >
              <div className="flex items-center text-center flex-col">
                <div className="relative mb-4">
                  {/* Neonowy blask jako stały podkład (usuwamy opacity-0 i group-hover) */}
                  <div
                    className="absolute inset-0 rounded-xl blur-xl opacity-75" // Stała widoczność i większe krycie
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 20px ${item.color}`,
                    }}
                  />

                  {/* Główny kontener ikonki */}
                  <div className="relative p-4 rounded-xl border border-gray-800 bg-black/50">
                    <item.icon
                      className="w-12 h-12" // Usuwamy scale-105 z hovera
                      style={{
                        color: item.color,
                        // Styl dla efektu neonowego cienia tekstowego na samej ikonie (stały blask)
                        filter: `drop-shadow(0 0 5px ${item.color}B3)`,
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};
export default Stack;
