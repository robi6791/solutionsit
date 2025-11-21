// This line tells Next.js that this component uses client-side features
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// Importujemy IconType, aby poprawnie typować ikony
import { IconType } from "react-icons";
// Zakładamy, że masz te obrazki
import placeholderImage1 from "@/public/images/projekt1.jpg";
import placeholderImage2 from "@/public/images/projekt2.jpg";
import placeholderImage3 from "@/public/images/projekt3.jpg";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

// === ZAKTUALIZOWANE IMPORTY IKON TECHNOLOGII ===
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiStrapi,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiZod,
  SiShadcnui,
  SiResend,
  SiPaypal,
  SiStripe,
} from "react-icons/si";
// ======================================

const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

// STAŁA MAPUJĄCA KLUCZE NA IKONY I KOLORY
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

// === ROZWIĄZANIE BŁĘDU TYPESCRIPT (TS7053) ===
type TechKey = keyof typeof TECHNOLOGY_ICONS;
// ==============================================

// ZAKTUALIZOWANA LISTA PROJEKTÓW Z NOWYMI OPISAMI
const projects: {
  id: number;
  projectLink: string;
  title: string;
  description: string;
  image: any;
  technologies: TechKey[];
}[] = [
  {
    id: 1,
    projectLink: "https://elektroniktech.de/",
    title: "Strona informacyjna (DE) / eBay",
    // === NOWY OPIS DLA PROJEKTU 1 (Strona DE / eBay) ===
    description:
      "Stworzyliśmy szybką stronę informacyjną (DE) dla działalności na eBay. Zawiera kluczowe informacje o firmie, regulamin i linki do głównych aukcji.",
    image: placeholderImage1,
    technologies: ["html", "css", "javascript"],
  },
  {
    id: 2,
    projectLink: "https://qvertech.eu/",
    title: "Strona IT / Sprzedaż Produkcja Serwis",
    // === NOWY OPIS DLA PROJEKTU 2 (Strona IT / Sprzedaż) ===
    description:
      "Zaprojektowaliśmy i wdrożyliśmy wizerunkową stronę dla firmy IT. Skupia się na sprzedaży i montażu komputerów, podzespołów oraz kompleksowych usługach IT.",
    image: placeholderImage2,
    technologies: ["html", "tailwind", "javascript"],
  },
  {
    id: 3,
    projectLink: "https://www.apfel-retter.de/",
    title: "E-commerce / Naprawa Smartfonów",
    // === NOWY OPIS DLA PROJEKTU 3 (E-commerce / Naprawa Smartfonów) ===
    description:
      "Kompletny system e-commerce przeznaczony do sprzedaży usług napraw smartfonów (głównie iPhone'ów). Obejmuje rezerwację usług, płatności (PayPal, Stripe) i automatyzację powiadomień.",
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

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, #000 50%, ${color})`;

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <motion.section
      style={{ backgroundImage }}
      className="py-64 min-h-[85vh] bg-black text-white"
      id="portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Lewa kolumna: Lista projektów */}
        <div>
          <h2 className="text-6xl font-bold mb-10">
            Wybrane <span className="text-cyan-300">projekty</span>
          </h2>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer mb-12 group"
            >
              <h3
                className={`text-3xl font-semibold transition-colors duration-300 ${
                  selectedProject.id === project.id
                    ? "text-cyan-300"
                    : "text-gray-400 group-hover:text-cyan-500"
                }`}
              >
                {project.title}
              </h3>

              {selectedProject.id === project.id && (
                // Lśniąca, neonowa linia
                <div
                  className="my-4"
                  style={{
                    borderBottom: "2px solid",
                    borderImage:
                      "linear-gradient(to right, #00FFFF, #007ACC) 1",
                    filter: "drop-shadow(0 0 5px #00FFFF80)",
                  }}
                ></div>
              )}

              {selectedProject.id === project.id && (
                <>
                  <p
                    className={`text-gray-400 mb-4 transition-all duration-500 ease-in-out ${
                      selectedProject.id === project.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* BLOK Z IKONKAMI TECHNOLOGII */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {project.technologies.map((techKey) => {
                      const tech = TECHNOLOGY_ICONS[techKey];

                      const IconComponent = tech.icon;
                      // Dostosowanie koloru dla ikon z białym lub czarnym logo, aby były widoczne na ciemnym tle
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
                            aria-label={tech.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* KONIEC BLOKU Z IKONKAMI */}

                  {/* ISTNIEJĄCY BLOK Z LINKIEM DO PROJEKTU */}
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300`}
                    style={{
                      textDecoration: "underline",
                      filter: "drop-shadow(0 0 3px #00FFFF80)",
                    }}
                  >
                    Link do projektu (kliknij, by przejść)
                  </a>
                  {/* KONIEC ISTNIEJĄCEGO BLOKU */}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Prawa kolumna: Obrazek i efekt neonu */}
        <div className="flex items-center justify-center relative">
          {/* Neonowy podkład - widoczny tylko dla aktywnego projektu */}
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

          {/* Główny kontener obrazu */}
          <motion.div
            key={selectedProject.id + "container"}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl border-2 border-cyan-500/50 p-1 bg-black/50"
          >
            <Image
              src={selectedProject.image.src}
              alt={selectedProject.title}
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
