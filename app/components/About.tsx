"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import {
  FiTool,
  FiTerminal,
  FiCode,
  FiServer,
  FiCloud,
  FiEdit,
} from "react-icons/fi";

const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

const skills = [
  {
    icon: FiTool,
    title: "Serwis PC & Elektronika",
    description:
      "Naprawy sprzętu (hardware/software), diagnostyka, modernizacje i montaż PC oraz laptopów. Doświadczenie w pracy z kartami graficznymi i komponentami na poziomie elektroniki.",
  },
  {
    icon: FiTerminal,
    title: "Administracja Systemami (Windows / Linux)",
    description:
      "Instalacja, konfiguracja i optymalizacja systemów Windows i Linux. Tworzenie stabilnych środowisk pracy, testy bezpieczeństwa oraz przygotowanie serwerów pod aplikacje webowe.",
  },
  {
    icon: FiCode,
    title: "Frontend & UI/UX",
    description:
      "Budowanie nowoczesnych, responsywnych interfejsów użytkownika (React, Next.js) z naciskiem na czytelność, wydajność i dostępność.",
  },
  {
    icon: FiServer,
    title: "Backend & Bazy Danych",
    description:
      "Tworzenie API w Node.js, integracje z usługami zewnętrznymi oraz praca z bazami danych (PostgreSQL, Strapi). Projektowanie struktur danych pod realne potrzeby użytkowników.",
  },
  {
    icon: FiCloud,
    title: "DevOps & Automatyzacja",
    description:
      "Konfiguracja serwerów (VPS), VPN, konteneryzacja (Docker), podstawowe CI/CD (GitLab) oraz automatyzacje i chatboty (n8n, integracje z AI).",
  },
  {
    icon: FiEdit,
    title: "Design & Grafika",
    description:
      "Projektowanie prostych, spójnych materiałów wizualnych (banery, grafiki, mockupy) z użyciem Canvy – pod social media, landing page i prezentacje.",
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

  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})
  `;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="py-32 px-4 md:px-6 text-white overflow-x-hidden"
      id="about"
      aria-label="Sekcja o mnie – kim jestem i jakie mam umiejętności jako freelancer IT"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-[1200px] mx-auto"
      >
        {/* Blury */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-5xl text-white w-full text-center font-bold mb-16"
        >
          O <span className="text-cyan-300">mnie</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {/* Kolumna z tekstem "Moja Droga" */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border border-gray-800 p-5 md:p-6 space-y-6 rounded-lg transition-colors duration-300 bg-gray-900/40 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-cyan-300">
                Moja droga w IT
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Nazywam się{" "}
                <span className="text-cyan-400 font-semibold">
                  Robert Senenko
                </span>{" "}
                i od wielu lat łączę{" "}
                <span className="text-cyan-400 font-semibold">
                  serwis komputerowy, elektronikę
                </span>{" "}
                oraz{" "}
                <span className="text-cyan-400 font-semibold">
                  programowanie full stack
                </span>
                . Od ponad{" "}
                <span className="text-cyan-400 font-semibold">
                  20 lat pracuję ze sprzętem
                </span>{" "}
                – naprawiam PC, laptopy i karty graficzne, diagnozuję problemy
                sprzętowe i systemowe, a także administruję systemami Windows i
                Linux.
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Od{" "}
                <span className="text-cyan-400 font-semibold">kilku lat</span>{" "}
                rozwijam się również jako{" "}
                <span className="text-cyan-400 font-semibold">
                  freelancer IT, fullstack developer i DevOps
                </span>
                . Tworzę aplikacje webowe, konfiguruję serwery, wdrażam projekty
                na VPS oraz dbam o stabilność i bezpieczeństwo środowiska.
                Dzięki połączeniu{" "}
                <span className="text-cyan-400 font-semibold">
                  praktyki sprzętowej, systemowej i developerskiej
                </span>{" "}
                potrafię patrzeć na projekt całościowo – od fizycznego sprzętu,
                przez system, aż po kod i użytkownika końcowego.
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Na co dzień pracuję w branży serwisowej IT, a po godzinach
                realizuję projekty z zakresu programowania fullstack,
                elektroniki i administracji systemami dla osób prywatnych oraz
                małych firm. Dzięki temu łączę praktykę zawodową z rozwojem
                własnych projektów.
              </p>
            </div>
          </motion.div>

          {/* Kolumna z umiejętnościami (Skills) – KAFLE NA MAX SZEROKOŚĆ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="w-full p-4 md:p-5 backdrop-blur-3xl rounded-lg border border-gray-800 transition-colors duration-300 bg-gray-900/40"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Ikonka */}
                  <div className="p-2 md:p-3 rounded-lg bg-cyan-500/50 text-cyan-300 shrink-0">
                    <skill.icon
                      className="w-5 h-5 md:w-6 md:h-6"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {skill.description}
                    </p>
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
