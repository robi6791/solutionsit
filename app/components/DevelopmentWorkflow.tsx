"use client";

import React, { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  FaCode,
  FaGitAlt,
  FaCloudUploadAlt,
  FaTools,
} from "react-icons/fa";

const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

// =========================
//   NOWA TABLICA WORKFLOW
// =========================

const workflow = [
  {
    title: "Code Quality & Standards",
    icon: FaCode,
    color: "#38BDF8",
    text: "Dbam o czytelny, spójny kod – korzystam z lintingu, formatowania i jasnych zasad stylu, żeby cały projekt rozwijał się w jednym kierunku.",
  },

  // 🔥 ZAMIANA Testing Workflow → Linux Workflow 🔥
  {
    title: "Linux Workflow",
    icon: FaTools, // możesz zamienić na FaTerminal lub FaLinux
    color: "#60A5FA",
    text: "Pracuję bezpośrednio w terminalu Linux, zarządzam usługami przez systemd, analizuję logi systemowe i sieciowe oraz monitoruję obciążenie zasobów. Diagnozuję problemy z procesami, pamięcią, dyskami i siecią, konfiguruję środowiska na VPS oraz optymalizuję działanie usług.",
  },

  {
    title: "Git Flow & Code Review",
    icon: FaGitAlt,
    color: "#F97316",
    text: "Pracuję z wykorzystaniem feature branches, pull requestów i code review, aby zachować przejrzystą historię zmian oraz wysoką jakość kodu przy pracy indywidualnej i zespołowej.",
  },

  {
    title: "Deployment & CI/CD",
    icon: FaCloudUploadAlt,
    color: "#34D399",
    text: "Stosuję procesy automatyzacji wdrożeń oraz zarządzam środowiskami na własnych VPS-ach, co zapewnia powtarzalność i kontrolę nad wersjami produkcyjnymi.",
  },

  {
    title: "Automatyzacja kodu (ESLint, Prettier, Git Hooks)",
    icon: FaCode,
    color: "#0EA5E9",
    text: "Korzystam z ESLint, Prettier i Git Hooks (np. Husky), aby wymusić spójny styl, formatowanie i jakościowe commity na każdym etapie pracy.",
  },

  {
    title: "DevOps & Repozytoria (GitHub, GitLab, Docker, VPS)",
    icon: FaCloudUploadAlt,
    color: "#14B8A6",
    text: "Pracuję z GitHub i GitLab, buduję środowiska developerskie i produkcyjne na VPS-ach oraz konteneryzuję aplikacje za pomocą Dockera.",
  },
];

// =========================

const DevelopmentWorkflow = () => {
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

  return (
    <motion.section
      style={{ backgroundImage }}
      className="py-32 px-4 text-white overflow-x-clip relative z-10 bg-black"
      aria-label="Development workflow – proces tworzenia oprogramowania"
    >
      <div className="max-w-[1200px] mx-auto relative">
        {/* =========================
            ANIMACJA TYLKO NA TYTUŁ
        ========================== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-left"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl">
            Development <span className="text-blue-300">Workflow</span>
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto text-left mb-10 text-sm md:text-base">
            Stosuję uporządkowany proces tworzenia oprogramowania — od jakości
            kodu, przez kontrolę wersji i środowiska, po automatyzację i
            dokumentację. Dzięki temu projekty są skalowalne, stabilne i łatwe w
            utrzymaniu.
          </p>
        </motion.div>

        {/* =========================
                KAFELKI (BEZ ANIMACJI)
        ========================== */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-lg border border-slate-800 bg-slate-950/10 transition-all duration-300 shadow-sm shadow-blue-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-xl opacity-60"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 18px ${item.color}`,
                    }}
                  />
                  <item.icon
                    className="relative w-10 h-10"
                    style={{
                      color: item.color,
                      filter: `drop-shadow(0 0 5px ${item.color}B3)`,
                    }}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default DevelopmentWorkflow;
