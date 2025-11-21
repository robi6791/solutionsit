"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";
// Zmienione ikonki, aby lepiej pasowały do całego profilu
import { FiTool, FiTerminal, FiCode, FiLayers, FiServer, FiCloud, FiEdit } from "react-icons/fi"; 

// Wybrana paleta niebiesko-cyjanowa
const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

// ZMODYFIKOWANA LISTA SKILLS
const skills = [
  {
    icon: FiTool,
    title: "Serwis PC & Elektronika",
    description:
      "Naprawy sprzętu (hardware/software), diagnostyka i montaż PC, laptopów, kart graficznych.",
  },
  {
    icon: FiTerminal,
    title: "Administracja Systemami (OS)",
    description:
      "Instalacja, konfiguracja i optymalizacja systemów Windows i Linux. Wdrażanie projektów na serwer i testowanie pod kątem zabezpieczeń.",
  },
  {
    icon: FiCode,
    title: "Frontend & UI/UX Design",
    description:
      "Budowanie nowoczesnych, responsywnych interfejsów (React, Next.js, TypeScript) oraz projektowanie UI/UX.",
  },
  {
    icon: FiServer,
    title: "Backend & Bazy Danych",
    description:
      "Tworzenie robust API (Node.js) i zarządzanie danymi (PostgreSQL, Strapi).",
  },
  {
    icon: FiCloud,
    title: "DevOps & Automatyzacja",
    description:
      "Serwer VPN, konteneryzacja (Docker), CI/CD (GitLab) oraz automatyzacje i chatboty (n8n, AI).",
  },
  {
    icon: FiEdit,
    title: "Design & Grafika",
    description:
      "Projektowanie materiałów marketingowych, banerów i grafik akcentujących za pomocą Canvy.",
  },
];

const About = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="py-32 px-6 text-white overflow-x-clip"
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-[1200px] mx-auto"
      >
        {/* Blury - Zmiana koloru na niebieski/cyjan */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl text-white w-full text-center font-bold mb-16"
        >
          O <span className="text-cyan-300">mnie</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Kolumna z tekstem "Moja Droga" */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border border-gray-800 p-6 space-y-6 rounded-lg hover:border-cyan-500/50 transition-colors duration-300 bg-gray-900/40 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-cyan-300">
                Moja Droga
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Jestem <span className="text-cyan-400 font-semibold">doświadczonym elektronikiem</span> i specjalistą ds. sprzętu i oprogramowania, z <span className="text-cyan-400 font-semibold">ponad 20-letnią praktyką</span> w naprawach PC, laptopów i kart graficznych, oraz administracji systemami (Windows/Linux). Moja wiedza techniczna i precyzja hardware'owa od <span className="text-cyan-400 font-semibold">5 lat</span> wspierana jest pasją do nowoczesnego <span className="text-cyan-400 font-semibold">projektowania i programowania stron webowych (Fullstack)</span>. Ta unikalna kombinacja wiedzy z obu światów pozwala mi tworzyć <span className="text-cyan-400 font-semibold">skalowalne rozwiązania</span> oparte na solidnych fundamentach.
              </p>
              
            </div>
          </motion.div>

          {/* Kolumna z umiejętnościami (Skills) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="p-6 backdrop-blur-3xl rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-colors duration-300 bg-gray-900/40"
              >
                <div className="flex items-start gap-4">
                  {/* Ikonka z akcentem cyjanu */}
                  <div className="p-3 rounded-lg bg-cyan-500/50 text-cyan-300"> 
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-gray-400">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;