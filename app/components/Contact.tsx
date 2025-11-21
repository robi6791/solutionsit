"use client";

import { motion } from "framer-motion";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  // Wybrane kolory dla ikon i tekstu:
  const phoneColor = "text-indigo-400";
  const emailColor = "text-sky-400";
  const whatsappColor = "text-green-400";
  // Zmniejszamy bazową czcionkę dla listy linków na 'text-xs' na małych ekranach, by zmieścić więcej
  const linkColor =
    "text-xs sm:text-sm text-gray-400 hover:text-sky-400 transition";

  // Nowy kolor nagłówka dla sekcji linków:
  const menuHeaderColor = "text-cyan-400";

  return (
    // Utrzymujemy kontener i ID
    <div className="pt-16 pb-1 max-w-[1200px] mx-auto px-4" id="contact">
      {/* 1. NAGŁÓWEK */}
      <div className="text-left mb-12">
        <h2
          className="text-3xl lg:text-5xl font-extrabold mb-10 
                       bg-gradient-to-r from-sky-400 to-indigo-500 
                       text-transparent bg-clip-text 
                       opacity-90 
                       text-stroke"
        >
          Skontaktuj się
        </h2>
      </div>

      {/* === 2. DANE KONTAKTOWE (STANDARDOWY STYL) === */}
      <div className="flex flex-col items-start space-y-6 text-white max-w-lg mb-12 border-b border-white/10 pb-12">
        <h3 className="text-lg font-semibold text-white mb-2">
          Bezpośredni Kontakt
        </h3>

        {/* Telefon */}
        <div className="flex items-center space-x-4">
          <AiOutlinePhone size={28} className={phoneColor} />
          <div>
            <p className="text-md font-medium text-white/50 mb-1">Telefon</p>
            <span className={`text-lg font-semibold ${phoneColor}`}>
              +48 502 316 393
            </span>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center space-x-4">
          <FaWhatsapp size={28} className={whatsappColor} />
          <div>
            <p className="text-md font-medium text-white/50 mb-1">WhatsApp</p>
            <span className={`text-lg font-semibold ${whatsappColor}`}>
              Napisz na WhatsApp
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <AiOutlineMail size={28} className={emailColor} />
          <div>
            <p className="text-md font-medium text-white/50 mb-1">
              Adres e-mail
            </p>
            <span className={`text-lg font-semibold ${emailColor}`}>
              kontakt@robisolutionsit.com
            </span>
          </div>
        </div>
      </div>

      {/* === 3. BLOK LINKÓW (5 KOLUMN W JEDNYM RZĘDZIE NA DUŻYCH EKRANACH) === */}
      <div
        // Siatka dla linków: 2 kolumny na XS, 3 na S, 5 na L (desktop)
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-white"
      >
        {/* KOLUMNA 1: TESTY ON-LINE */}
        <div className="text-sm">
          <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
            Testy On-line
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/tests/keyboard" target="_blank" className={linkColor}>
                Klawiatura
              </a>
            </li>
            <li>
              <a
                href="/tests/mic-speaker"
                target="_blank"
                className={linkColor}
              >
                Mikrofon i Głośniki
              </a>
            </li>{" "}
            <li>
              <a
                href="/tests/internet-speed"
                target="_blank"
                className={linkColor}
              >
                Test Prędkości Internetu
              </a>
            </li>{" "}
            <li>
              <a href="/tests/lcd" target="_blank" className={linkColor}>
                Wyświetlacz LCD/Monitor
              </a>
            </li>{" "}
          </ul>
        </div>

        {/* KOLUMNA 2: KALKULATORY */}
        <div className="text-sm">
          <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
            Kalkulatory
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/calculators/voltage-divider"
                target="_blank"
                className={linkColor}
              >
                Dzielnik napięcia
              </a>
            </li>
            <li>
              <a
                href="/calculators/subnet"
                target="_blank"
                className={linkColor}
              >
                Kalkulator Subnettingu
              </a>
            </li>

            <li>
              <a
                href="/calculators/resistor-color-code"
                target="_blank"
                className={linkColor}
              >
                Kody Paskowe Rezystorów
              </a>
            </li>
            <li>
              <a
                href="/calculators/smd-resistor-code"
                target="_blank"
                className={linkColor}
              >
                Kody Rezystorów SMD
              </a>
            </li>
            <li>
              <a
                href="/calculators/base-converter"
                target="_blank"
                className={linkColor}
              >
                Konwersja Liczb
              </a>
            </li>
          </ul>
        </div>

        {/* KOLUMNA 3: SYSTEMY OPERACYJNE (NOWE LINKI) */}
        <div className="text-sm">
          <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
            Systemy Operacyjne
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://learn.microsoft.com/en-us/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                Microsoft Learn (Win/AD)
              </a>
            </li>
            <li>
              <a
                href="https://www.tldp.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                Linux Documentation Project
              </a>
            </li>
            <li>
              <a
                href="https://wiki.archlinux.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                Arch Wiki (Konfiguracja OS)
              </a>
            </li>
            <li>
              <a
                href="https://learn.microsoft.com/en-us/powershell/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                PowerShell Docs
              </a>
            </li>
          </ul>
        </div>

        {/* KOLUMNA 4: CIEKAWOSTKI I TRENDY IT (NOWE LINKI) */}
        <div className="text-sm">
          <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>Trendy IT</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://news.ycombinator.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                Hacker News (Tech News)
              </a>
            </li>
            <li>
              <a
                href="https://www.cisa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                CISA (Cybersecurity Trends)
              </a>
            </li>
            <li>
              <a
                href="https://github.com/trending"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                GitHub Trending Repos
              </a>
            </li>
            <li>
              <a
                href="https://techcrunch.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                TechCrunch / The Verge
              </a>
            </li>
            <li>
              <a
                href="https://www.tomshardware.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                Tom's Hardware (Recenzje)
              </a>
            </li>
            {/* NOWY LINK: HARDWARE 2 */}
            <li>
              <a
                href="https://www.anandtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                AnandTech (Analiza Sprzętu)
              </a>
            </li>
          </ul>
        </div>

        {/* KOLUMNA 5: AI I AUTOMATYZACJA (NOWE LINKI) */}
        <div className="text-sm">
          <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
            AI Automatyzacja
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.tensorflow.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                TensorFlow (Deep Learning)
              </a>
            </li>
            <li>
              <a
                href="https://pytorch.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                PyTorch (Biblioteka ML)
              </a>
            </li>
            <li>
              <a
                href="https://automatetheboringstuff.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                Automatyzacja Pythonem
              </a>
            </li>
            <li>
              <a
                href="https://platform.openai.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkColor}
              >
                OpenAI Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* KONIEC BLOKU LINKÓW */}
    </div>
  );
};

export default Contact;
