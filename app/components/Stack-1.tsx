"use client";

import React, { useEffect } from "react";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaGitlab,
  FaBrain,
  FaServer,
  FaCogs,
  FaNetworkWired,
  FaTools,
  FaCode,
  FaShieldAlt,
  FaClipboardCheck,
  FaCloudUploadAlt,
  FaBug,
  FaBook,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiPrisma,
  SiPostgresql,
  SiPostman,
  SiNginx,
} from "react-icons/si";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

// 1. Technologie developerskie
const devTech = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Prisma", icon: SiPrisma, color: "#48B47E" },
];

// 2. DevOps / serwery
const devOpsSkills = [
  {
    name: "Docker / Docker CLI",
    icon: FaDocker,
    color: "#0db7ed",
    description:
      "Konteneryzacja aplikacji, docker-compose, budowa obrazów i optymalizacja środowisk.",
  },
  {
    name: "Nginx",
    icon: SiNginx,
    color: "#009639",
    description:
      "Reverse proxy, SSL/TLS, routing domen, load balancing i serwowanie statycznych zasobów.",
  },
  {
    name: "Caddy",
    icon: FaServer,
    color: "#34D399",
    description:
      "Lekki serwer HTTP z automatycznym SSL, prostą konfiguracją i szybkim wdrażaniem usług.",
  },
  {
    name: "Portainer",
    icon: FaServer,
    color: "#33AADD",
    description:
      "Panel webowy do zarządzania kontenerami Docker, monitoring i kontrola usług.",
  },
  {
    name: "Filebrowser",
    icon: FaServer,
    color: "#E5E5E5",
    description:
      "Webowy dostęp do plików na serwerze, uprawnienia, katalogi i wygodne zarządzanie zasobami.",
  },
  {
    name: "virt-manager",
    icon: FaCogs,
    color: "#AAAAAA",
    description:
      "Zarządzanie maszynami KVM, sieciami bridge, storage i wirtualną infrastrukturą.",
  },
  {
    name: "Vagrant",
    icon: FaCogs,
    color: "#F97316",
    description:
      "Tworzenie powtarzalnych środowisk developerskich, provisioning i automatyzacja VM.",
  },
  {
    name: "Wazuh",
    icon: FaShieldAlt,
    color: "#4AC6F7",
    description:
      "Monitoring bezpieczeństwa, logi, alerty oraz analiza incydentów na serwerach.",
  },
  {
    name: "Networking (Wireshark, nmap)",
    icon: FaNetworkWired,
    color: "#1679A7",
    description:
      "Analiza ruchu, skanowanie portów i usług, diagnoza problemów sieciowych i bezpieczeństwa.",
  },
];

// 3. Tools / narzędzia
const tools = [
  { name: "VS Code", icon: FaCode, color: "#007ACC" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
  { name: "GitLab", icon: FaGitlab, color: "#FC6D27" },
  { name: "n8n", icon: FaTools, color: "#FF6A3D" },
  { name: "Canva", icon: FaTools, color: "#22A7F2" },
  { name: "ChatGPT", icon: FaBrain, color: "#00FFCB" },
  { name: "Gemini", icon: FaBrain, color: "#7B6CFF" },
  { name: "Codex (VS Code)", icon: FaBrain, color: "#00BFFF" },
];

// 4. Development Workflow
const workflow = [
  {
    title: "Planowanie & zakres",
    icon: FaClipboardCheck,
    color: "#38BDF8",
    text: "Na początku ustalam wymagania projektu, spisuję funkcjonalności i dzielę pracę na mniejsze, konkretne zadania.",
  },
  {
    title: "Development & Git",
    icon: FaGitAlt,
    color: "#F97316",
    text: "Tworzę kod w oddzielnych branchach, wykorzystuję Git i GitHub do wersjonowania projektu oraz dbam o czytelne commity.",
  },
  {
    title: "Testowanie i poprawki",
    icon: FaBug,
    color: "#EF4444",
    text: "Testuję kluczowe funkcje, formularze i logikę aplikacji. Sprawdzam responsywność, UX i poprawiam błędy wykryte podczas pracy.",
  },
  {
    title: "Deployment na VPS",
    icon: FaCloudUploadAlt,
    color: "#34D399",
    text: "Wdrażam projekty na swoim VPS z użyciem Dockera oraz Nginx/Caddy. Konfiguruję domeny, SSL i środowiska produkcyjne.",
  },
  {
    title: "Monitoring działania",
    icon: FaServer,
    color: "#4AC6F7",
    text: "Po wdrożeniu monitoruję działanie aplikacji, sprawdzam logi serwera i reaguję na potencjalne problemy.",
  },
  {
    title: "Ulepszanie i rozwój",
    icon: FaBook,
    color: "#EAB308",
    text: "Na podstawie opinii użytkowników, testów i obserwacji ulepszam funkcjonalności, wydajność oraz wygląd aplikacji.",
  },
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

  return (
    <motion.section
      id="stack"
      aria-label="Stack technologiczny, DevOps, narzędzia i workflow"
      style={{ backgroundImage }}
      className="py-32 px-4 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-[1200px] mx-auto"
      >
        {/* Nagłówek całej sekcji */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-left mx-auto max-w-4xl"
        >
          Tech <span className="text-blue-300">Stack</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto mb-12 text-left"
        >
          Łączę development aplikacji webowych z administracją serwerami i
          nowoczesnym podejściem DevOps. Poniżej technologie, narzędzia i
          procesy, z których korzystam na co dzień.
        </motion.p>

        {/* Separator pod tytułem */}
        <div className="relative my-10 md:my-14 flex justify-center">
          <div className="w-full max-w-4xl h-px bg-white/10" />
          <div className="absolute inset-0 mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-md" />
        </div>

        {/* 1. Technologie developerskie */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-28 md:mb-32"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl">
            Technologie <span className="text-blue-300">developerskie</span>
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto text-left mb-10 text-sm md:text-base">
            Technologie, których używam do tworzenia nowoczesnych, szybkich i
            skalowalnych aplikacji webowych.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {devTech.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
                className="p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 bg-gray-900/40 backdrop-blur-sm"
              >
                <div className="flex items-center text-center flex-col">
                  <div className="relative mb-4">
                    <div
                      className="absolute inset-0 rounded-xl blur-xl opacity-75"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 20px ${item.color}`,
                      }}
                    />
                    <div className="relative p-4 rounded-xl border border-gray-800 bg-black/50">
                      <item.icon
                        className="w-12 h-12"
                        style={{
                          color: item.color,
                          filter: `drop-shadow(0 0 5px ${item.color}B3)`,
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold">{item.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SEPARATOR między dev tech a DevOps */}
        <div className="relative my-20 md:my-28 flex justify-center">
          <div className="w-full max-w-4xl h-px bg-white/10" />
          <div className="absolute inset-0 mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-md" />
        </div>

        {/* 2. DevOps / serwery */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-28 md:mb-32"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl">
            DevOps{" "}
            <span className="text-blue-300">/ serwery i infrastruktura</span>
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto text-left mb-10 text-sm md:text-base">
            Administracja serwerami Linux, konteneryzacja, automatyzacja oraz
            bezpieczeństwo środowisk produkcyjnych.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {devOpsSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * index }}
                className="p-6 rounded-xl border border-gray-800 bg-gray-900/40 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className="absolute inset-0 blur-xl opacity-60"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 18px ${skill.color}`,
                      }}
                    />
                    <skill.icon
                      className="relative w-10 h-10"
                      style={{
                        color: skill.color,
                        filter: `drop-shadow(0 0 5px ${skill.color}B3)`,
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-1">{skill.name}</h4>
                    <p className="text-gray-400 text-sm">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SEPARATOR między DevOps a Tools */}
        <div className="relative my-20 md:my-28 flex justify-center">
          <div className="w-full max-w-4xl h-px bg-white/10" />
          <div className="absolute inset-0 mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-md" />
        </div>

        {/* 3. Tools / narzędzia */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-28 md:mb-32"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl">
            Tools <span className="text-blue-300">/ narzędzia</span>
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-left text-sm md:text-base">
            W pracy korzystam z narzędzi, które przyspieszają development,
            testowanie i automatyzację – od VS Code i Git, przez Postmana, po
            narzędzia AI takie jak ChatGPT i Gemini.
          </p>

          <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-5 place-items-center">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-2">
                  <div
                    className="absolute inset-0 rounded-lg blur-lg opacity-40"
                    style={{
                      backgroundColor: tool.color,
                      boxShadow: `0 0 12px ${tool.color}`,
                    }}
                  />
                  <div className="relative p-3 rounded-lg border border-gray-800 bg-black/40">
                    <tool.icon
                      className="w-8 h-8"
                      style={{
                        color: tool.color,
                        filter: `drop-shadow(0 0 4px ${tool.color}A0)`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-300 text-center">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SEPARATOR między Tools a Workflow */}
        <div className="relative my-20 md:my-28 flex justify-center">
          <div className="w-full max-w-4xl h-px bg-white/10" />
          <div className="absolute inset-0 mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-md" />
        </div>

        {/* 4. Development Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl">
            Development <span className="text-blue-300">Workflow</span>
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto text-left mb-10 text-sm md:text-base">
            Stosuję profesjonalny proces tworzenia oprogramowania — od jakości
            kodu, przez testy i kontrolę wersji, po monitoring, deployment i
            dokumentację. Dzięki temu projekty są skalowalne, stabilne i łatwe w
            utrzymaniu.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {workflow.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="p-6 rounded-xl border border-gray-800 bg-gray-900/40 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur"
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Stack;
