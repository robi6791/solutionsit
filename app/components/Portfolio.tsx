// This line tells Next.js that this component uses client-side features
"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";

import placeholderImage1 from "@/public/images/projekt1.jpg";
import placeholderImage2 from "@/public/images/projekt2.jpg";
import placeholderImage3 from "@/public/images/projekt3.jpg";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

// === IKONY TECHNOLOGII ===
import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiZod,
  SiShadcnui,
  SiResend,
  SiPaypal,
  SiStripe,
} from "react-icons/si";

const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

// Mapowanie technologia → ikona, kolor, nazwa
const TECHNOLOGY_ICONS = {
  html: { icon: SiHtml5, color: "#E34F26", name: "HTML5" },
  css: { icon: SiCss3, color: "#1572B6", name: "CSS3" },
  javascript: { icon: SiJavascript, color: "#F7DF1E", name: "JavaScript" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind CSS" },
  react: { icon: FaReact, color: "#61DAFB", name: "React" },
  nextjs: { icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js" },
  postgresql: { icon: SiPostgresql, color: "#336791", name: "PostgreSQL" },
  prisma: { icon: SiPrisma, color: "#48B47E", name: "Prisma" },
  zod: { icon: SiZod, color: "#3178C6", name: "Zod" },
  shadcn: { icon: SiShadcnui, color: "#FFFFFF", name: "shadcn/ui" },
  resend: { icon: SiResend, color: "#000000", name: "Resend" },
  paypal: { icon: SiPaypal, color: "#003087", name: "PayPal" },
  stripe: { icon: SiStripe, color: "#635BFF", name: "Stripe" },
};

type TechKey = keyof typeof TECHNOLOGY_ICONS;

type Project = {
  id: number;
  projectLink: string;
  title: string;
  description: string;
  image: StaticImageData;
  technologies: TechKey[];
};

const projects: Project[] = [
  {
    id: 1,
    projectLink: "https://elektroniktech.de/",
    title: "Strona informacyjna (DE) / eBay",
    description:
      "Lekka strona informacyjna w języku niemieckim wspierająca sprzedaż na eBay. Zawiera kluczowe informacje o działalności, regulaminy oraz linki do głównych aukcji.",
    image: placeholderImage1,
    technologies: ["html", "css", "javascript"],
  },
  {
    id: 2,
    projectLink: "https://qvertech.eu/",
    title: "Strona IT / Sprzedaż · Produkcja · Serwis",
    description:
      "Wizerunkowa strona firmy IT skupionej na sprzedaży, montażu oraz serwisie komputerów. Projekt nastawiony na czytelne przedstawienie oferty i łatwy kontakt dla klientów.",
    image: placeholderImage2,
    technologies: ["html", "tailwind", "javascript"],
  },
  {
    id: 3,
    projectLink: "https://www.apfel-retter.de/",
    title: "E-commerce / Naprawa smartfonów",
    description:
      "Rozbudowany system e-commerce dla serwisu naprawy smartfonów (głównie iPhone). Obejmuje rezerwację usług, integrację płatności (PayPal, Stripe), panel zarządzania oraz automatyczne powiadomienia mailowe.",
    image: placeholderImage3,
    technologies: [
      "react",
      "nextjs",
      "tailwind",
      "postgresql",
      "prisma",
      "zod",
      "shadcn",
      "resend",
      "paypal",
      "stripe",
    ],
  },
];

const Portfolio = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

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
      id="portfolio"
      aria-label="Wybrane projekty – portfolio stron i aplikacji webowych"
      style={{ backgroundImage }}
      className="py-64 min-h-[85vh] bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEWA KOLUMNA: lista projektów + opis */}
        <div>
          {/* ANIMOWANY TYTUŁ – najazd z lewej */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Portfolio – wybrane{" "}
            <span className="text-cyan-300">projekty</span>
          </motion.h2>

          <p className="text-sm md:text-base text-gray-300 mb-10 max-w-xl">
            Poniżej znajdziesz kilka przykładów projektów, nad którymi
            pracowałem – od prostych stron informacyjnych po bardziej złożone
            systemy e-commerce oparte o React, Next.js, bazy danych i integracje
            płatności.
          </p>

          {projects.map((project) => {
            const isSelected = selectedProject.id === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer mb-12 group"
              >
                <h3
                  className={`text-2xl md:text-3xl font-semibold transition-colors duration-300 ${
                    isSelected
                      ? "text-cyan-300"
                      : "text-gray-400 group-hover:text-cyan-500"
                  }`}
                >
                  {project.title}
                </h3>

                {isSelected && (
                  <>
                    {/* neonowa linia */}
                    <div
                      className="my-4"
                      style={{
                        borderBottom: "2px solid",
                        borderImage:
                          "linear-gradient(to right, #00FFFF, #007ACC) 1",
                        filter: "drop-shadow(0 0 5px #00FFFF80)",
                      }}
                    />

                    <p className="text-gray-400 mb-4 transition-all duration-500 ease-in-out">
                      {project.description}
                    </p>

                    {/* Technologie – ikony + nazwy (sr-only) */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {project.technologies.map((techKey) => {
                        const tech = TECHNOLOGY_ICONS[techKey];
                        const IconComponent = tech.icon;

                        const iconColor =
                          techKey === "nextjs" || techKey === "shadcn"
                            ? "#FFFFFF"
                            : techKey === "resend"
                            ? "#FF4785"
                            : tech.color;

                        return (
                          <div
                            key={techKey}
                            className="flex items-center space-x-2 text-sm font-medium"
                            title={tech.name}
                          >
                            <IconComponent
                              className="w-4 h-4 transition-transform hover:scale-110"
                              style={{
                                color: iconColor,
                                filter: `drop-shadow(0 0 3px ${iconColor}B3)`,
                              }}
                              aria-hidden="true"
                            />
                            <span className="text-xs text-gray-300">
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300 underline"
                      style={{
                        filter: "drop-shadow(0 0 3px #00FFFF80)",
                      }}
                    >
                      Zobacz projekt na żywo
                    </a>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* PRAWA KOLUMNA: obraz wybranego projektu */}
        <div className="flex items-center justify-center relative">
          {/* Neonowy podkład */}
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 m-4 rounded-xl blur-2xl opacity-40 -z-10"
            style={{
              backgroundColor: "rgba(0, 255, 255, 0.5)",
              boxShadow: "0 0 40px rgba(0, 255, 255, 0.7)",
            }}
          />

          <motion.div
            key={selectedProject.id + "-container"}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl border-2 border-cyan-500/50 p-1 bg-black/50"
          >
            <Image
              src={selectedProject.image}
              alt={`Podgląd projektu: ${selectedProject.title}`}
              className="rounded-lg shadow-lg"
              width={800}
              height={450}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
