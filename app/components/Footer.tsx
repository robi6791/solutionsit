"use client";

import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type LedConfig = {
  label: string;
  color: string;
  glow: string;
  blinking: boolean;
  duration?: number;
  delay?: number;
};

const techLeds: LedConfig[] = [
  // RZĄD 1
  {
    label: "Next.js",
    color: "#ffffff",
    glow: "0 0 6px rgba(255,255,255,0.9)",
    blinking: false,
  },
  {
    label: "Tailwind",
    color: "#38BDF8",
    glow: "0 0 6px rgba(56,189,248,0.9)",
    blinking: false,
  },
  {
    label: "PostgreSQL",
    color: "#336791",
    glow: "0 0 6px rgba(51,103,145,0.9)",
    blinking: false,
  },
  {
    label: "Prisma",
    color: "#0EA5E9",
    glow: "0 0 6px rgba(14,165,233,0.9)",
    blinking: true,
    duration: 2.2,
    delay: 0.4,
  },

  // RZĄD 2
  {
    label: "Postman",
    color: "#FF6C37",
    glow: "0 0 6px rgba(255,108,55,0.9)",
    blinking: false,
  },
  {
    label: "n8n",
    color: "#FF6A3D",
    glow: "0 0 6px rgba(255,106,61,0.9)",
    blinking: true,
    duration: 2.4,
    delay: 0.6,
  },
  {
    label: "GitHub",
    color: "#ffffff",
    glow: "0 0 6px rgba(255,255,255,0.9)",
    blinking: false,
  },
  {
    label: "GitLab",
    color: "#FC6D27",
    glow: "0 0 6px rgba(252,109,39,0.9)",
    blinking: false,
  },

  // RZĄD 3
  {
    label: "Docker",
    color: "#0db7ed",
    glow: "0 0 6px rgba(13,183,237,0.9)",
    blinking: true,
    duration: 1.8,
    delay: 0.2,
  },
  {
    label: "VPS",
    color: "#8B5CF6",
    glow: "0 0 6px rgba(139,92,246,0.9)",
    blinking: true,
    duration: 2.8,
    delay: 0.5,
  },
  {
    label: "Nginx",
    color: "#009639",
    glow: "0 0 6px rgba(0,150,57,0.9)",
    blinking: false,
  },
  {
    label: "Caddy",
    color: "#22C55E",
    glow: "0 0 6px rgba(34,197,94,0.9)",
    blinking: true,
    duration: 2.6,
    delay: 0.7,
  },

  // RZĄD 4
  {
    label: "ChatGPT",
    color: "#22C7A3",
    glow: "0 0 6px rgba(34,199,163,0.9)",
    blinking: false,
  },
  {
    label: "Codex",
    color: "#0EA5E9",
    glow: "0 0 6px rgba(14,165,233,0.9)",
    blinking: true,
    duration: 2.3,
    delay: 0.4,
  },
  {
    label: "Vagrant",
    color: "#2563EB",
    glow: "0 0 6px rgba(37,99,235,0.9)",
    blinking: false,
  },
  {
    label: "Wireshark",
    color: "#0EA5E9",
    glow: "0 0 6px rgba(14,165,233,0.9)",
    blinking: true,
    duration: 2.9,
    delay: 0.6,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [views, setViews] = useState<number | null>(null);

  const handleOpenCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-settings"));
    }
  };

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch("/api/views");
        if (!res.ok) return;
        const data = await res.json();
        setViews(data.views ?? null);
      } catch (error) {
        console.error("Failed to fetch views", error);
      }
    };

    fetchViews();
  }, []);

  return (
    <footer
      className="py-8 w-full"
      aria-label="Stopka strony – informacje prawne, media społecznościowe i licznik odwiedzin"
    >
      {/* ======= BACKGROUND + INDUSTRIAL GRID + LED PANEL ======= */}
      <div className="relative overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-black via-slate-950 to-black py-10 lg:py-24">
        {/* 🔹 Animowany industrial grid */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(148, 163, 184, 0.12) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(148, 163, 184, 0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* 🔹 Power Bar LED */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 
                     bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-70"
          aria-hidden="true"
        />

        {/* 🔹 Panel LED z technologiami */}
        <div className="relative px-4 flex justify-center">
          <div className="select-none flex flex-col items-center gap-8 max-w-[1000px] w-full">
            {/* RESPONSYWNA SIATKA */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
              {techLeds.map(
                ({ label, color, glow, blinking, duration, delay }) => {
                  const LedDot = blinking ? motion.span : "span";

                  return (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 min-w-[56px] max-w-[90px]"
                    >
                      <LedDot
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: color,
                          boxShadow: glow,
                        }}
                        {...(blinking
                          ? {
                              animate: {
                                opacity: [0.25, 1, 0.4, 0.9, 0.25],
                              },
                              transition: {
                                duration: duration ?? 2,
                                repeat: Infinity,
                                ease: "easeInOut" as const,
                                delay: delay ?? 0,
                              },
                            }
                          : {})}
                      />
                      <span className="text-[0.55rem] tracking-[0.20em] text-slate-300/80 uppercase text-center mt-[1px] leading-snug">
                        {label}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======= LOWER FOOTER SECTION ======= */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 mb-2 flex flex-col sm:flex-row sm:justify-between items-center gap-6">
        {/* LEWA STRONA */}
        <div className="text-center sm:text-left">
          <p className="text-gray-400 text-sm">
            © {currentYear} robisolutionsit. All rights reserved.
          </p>

          <p className="text-gray-400 text-xs mt-2 space-x-3">
            <a
              href="/polityka-prywatnosci"
              className="text-sky-400 underline underline-offset-2 hover:text-sky-300 transition"
            >
              Polityka prywatności
            </a>
            <span>·</span>

            <a
              href="/polityka-cookies"
              className="text-sky-400 underline underline-offset-2 hover:text-sky-300 transition"
            >
              Polityka cookies
            </a>
            <span>·</span>

            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="text-xs text-gray-400 hover:text-sky-300 underline underline-offset-2 hover:cursor-pointer"
            >
              Ustawienia cookies
            </button>
          </p>
        </div>

        {/* PRAWA STRONA – Social + licznik */}
        <ul className="flex flex-row flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 items-center">
          {/* GitHub */}
          <li>
            <a
              href="https://github.com/robi6791"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub – projekty Roberta"
            >
              <AiFillGithub
                size={28}
                className="text-gray-500 hover:text-sky-300 transition duration-300"
              />
            </a>
          </li>

          {/* Facebook */}
          <li>
            <a
              href="https://facebook.com/robisolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook – społeczność i aktualizacje"
            >
              <AiFillFacebook
                size={28}
                className="text-gray-500 hover:text-blue-500 transition duration-300"
              />
            </a>
          </li>

          {/* Twitter / X */}
          <li>
            <a
              href="https://twitter.com/robisolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X – aktualności"
            >
              <FaXTwitter
                size={26}
                className="text-gray-500 hover:text-white transition duration-300"
              />
            </a>
          </li>

          {/* YouTube */}
          <li>
            <a
              href="https://www.youtube.com/@robi-solutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube – filmy i tutoriale"
            >
              <AiFillYoutube
                size={28}
                className="text-gray-500 hover:text-red-400 transition duration-300"
              />
            </a>
          </li>

          {/* Instagram */}
          <li>
            <a
              href="https://instagram.com/robi_solutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram – short content i reels"
            >
              <AiFillInstagram
                size={28}
                className="text-gray-500 hover:text-pink-400 transition duration-300"
              />
            </a>
          </li>

          {/* Telegram */}
          <li>
            <a
              href="https://t.me/robi_solutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram – kanał aktualizacji i automatyzacji"
            >
              <FaTelegramPlane
                size={26}
                className="text-gray-500 hover:text-sky-400 transition duration-300"
              />
            </a>
          </li>

          {/* LinkedIn */}
          <li>
            <a
              href="https://linkedin.com/in/robisolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn – profil zawodowy"
            >
              <AiFillLinkedin
                size={28}
                className="text-gray-500 hover:text-blue-400 transition duration-300"
              />
            </a>
          </li>

          {/* Licznik odwiedzin */}
          {views !== null && (
            <li
              className="flex items-center gap-2 text-gray-400 text-xs opacity-80"
              aria-label={`Liczba odwiedzin strony: ${views.toLocaleString(
                "pl-PL"
              )}`}
              title={`Liczba odwiedzin: ${views.toLocaleString("pl-PL")}`}
            >
              <FiEye className="text-cyan-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              <span>Odwiedziny:</span>
              <span>{views.toLocaleString("pl-PL")}</span>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
