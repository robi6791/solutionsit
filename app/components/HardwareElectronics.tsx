"use client";

import React, { useEffect } from "react";
import {
  FaTools,
  FaWrench,
  FaMicrochip,
  FaThermometerHalf,
  FaCogs,
  FaServer,
  FaLaptop,
  FaNetworkWired,
} from "react-icons/fa";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

// Kolory do animacji tła
const COLORS_TOP = ["#007ACC", "#00BFFF", "#00FFFF", "#40E0D0"];

const skills = [
  {
    title: "Diagnostyka i naprawy",
    icon: FaWrench,
    color: "#38BDF8",
    points: [
      "Naprawy płyt głównych laptopów i PC",
      "Lutowanie SMD / BGA (gniazda, układy, elementy)",
      "Usuwanie zwarć, diagnoza uszkodzeń zasilania",
      "Naprawy kart graficznych i układów chłodzenia",
    ],
  },
  {
    title: "Modernizacje i optymalizacje",
    icon: FaThermometerHalf,
    color: "#F97316",
    points: [
      "Upgrade procesorów, GPU, RAM, SSD",
      "Optymalizacja termiczna (pasty, termopady)",
      "Czyszczenie, serwis chłodzenia, undervolting",
    ],
  },
  {
    title: "Elektronika i integracje sprzętowe",
    icon: FaMicrochip,
    color: "#A855F7",
    points: [
      "Raspberry Pi i mini-serwery domowe",
      "Budowa prostych systemów embedded",
      "Diagnostyka czujników, modułów, zasilania",
    ],
  },
];

const integration = [
  {
    title: "Zrozumienie sprzętu = lepszy DevOps",
    icon: FaServer,
    color: "#34D399",
    text: "Znajomość elektroniki i hardware pozwala mi lepiej diagnozować problemy wydajnościowe, temperatury, throttling CPU/GPU oraz stabilność serwerów VPS i bare-metal.",
  },
  {
    title: "Hardware wspiera backend",
    icon: FaCogs,
    color: "#00BFFF",
    text: "Rozumiem jak zasoby fizyczne — IO, RAM, CPU, magistrale, chłodzenie — wpływają na realną wydajność kontenerów Docker i aplikacji backendowych.",
  },
  {
    title: "Doświadczenie serwisowe = szybka diagnostyka",
    icon: FaLaptop,
    color: "#FACC15",
    text: "Potrafię precyzyjnie diagnozować problemy: od zasilania, przez uszkodzenia płyty, po niestabilne działanie systemu czy sieci LAN/WiFi.",
  },
  {
    title: "Sieci w praktyce",
    icon: FaNetworkWired,
    color: "#7DD3FC",
    text: "Łączę warstwę fizyczną z konfiguracją systemową — wiem jak działają przewody, interfejsy, routery oraz jak je diagnozować narzędziami typu nmap, Wireshark.",
  },
];

const HardwareElectronics = () => {
  // 1. Animacja koloru tła
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  // 2. Generowanie podwójnego gradientu promieniowego (GÓRA i DÓŁ)
  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 100%, #000 50%, ${color}),
    radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})
  `;

  return (
    <motion.section
      id="hardware"
      className="py-32 px-4 text-white"
      aria-label="Elektronika i serwis komputerowy w połączeniu z IT i DevOps"
      style={{ backgroundImage }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Główny nagłówek + animowana ikonka */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }} // <== odpala za każdym razem
            transition={{ duration: 0.6 }}
            className="relative"
            aria-hidden="true"
          >
            {/* Glow za ikoną */}
            <motion.div
              className="absolute inset-0 rounded-xl blur-xl opacity-70"
              style={{
                background: "linear-gradient(135deg, #38BDF8, #A855F7)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
            {/* Sama ikona */}
            <motion.div
              className="relative p-3 rounded-lg border border-white/20 bg-slate-950/10"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <FaTools className="w-8 h-8 text-cyan-300 " />
            </motion.div>
          </motion.div>

          {/* TYTUŁ – najazd z lewej + powtarzalna animacja whileInView */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }} // <== za każdym scroll-in
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-left"
          >
            Hardware & <span className="text-blue-300">Electronics</span>
          </motion.h2>
        </div>

        {/* Krótki opis */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 max-w-3xl mb-12 text-left"
        >
          Od lat zajmuję się serwisem laptopów, PC i elektroniką. To
          doświadczenie realnie wspiera moją pracę jako Fullstack Developer i
          DevOps – rozumiem działanie sprzętu, sieci i środowisk od warstwy
          fizycznej po aplikacyjną.
        </motion.p>

        {/* Bloki: serwis / elektronika */}
        <div className="grid gap-12 md:grid-cols-3">
          {skills.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }} // <== każdorazowo
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-black/30 border border-white/10 backdrop-blur-md"
            >
              <div className="relative mb-4">
                <div
                  className="absolute inset-0 blur-xl opacity-20"
                  style={{ backgroundColor: item.color }}
                />
                <item.icon
                  className="relative w-8 h-8"
                  style={{
                    color: item.color,
                  }}
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <ul className="text-gray-300 text-sm space-y-2">
                {item.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="my-16 h-px bg-white/10 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-sm" />
        </div>

        {/* Jak to łączy się z IT / DevOps */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }} // <== też reaguje za każdym razem
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-6"
        >
          Jak to wspiera moje{" "}
          <span className="text-blue-300">IT & DevOps?</span>
        </motion.h3>

        <div className="grid gap-12 md:grid-cols-2">
          {integration.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }} // <== powtarzalne
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-black/30 border border-white/10 backdrop-blur-sm"
            >
              <div className="relative mb-3">
                <div
                  className="absolute inset-0 blur-md opacity-40"
                  style={{ backgroundColor: item.color }}
                />
                <item.icon
                  className="relative w-8 h-8"
                  style={{
                    color: item.color,
                    filter: `drop-shadow(0 0 3px ${item.color}A0)`,
                  }}
                  aria-hidden="true"
                />
              </div>

              <h4 className="text-lg font-semibold py-4">{item.title}</h4>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HardwareElectronics;
