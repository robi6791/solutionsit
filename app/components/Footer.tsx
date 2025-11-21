import React from "react";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiFillLinkedin, // Dodano LinkedIn
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

// Dodanie globalnego stylu dla text-stroke (zakładając konfigurację w pliku globalnym CSS/Tailwind)
/* Jeśli używasz pliku CSS, dodaj:
.text-stroke {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1); 
  text-stroke: 1px rgba(255, 255, 255, 0.1); 
} 
*/

const Footer = () => {
  // Funkcja JS do pobrania bieżącego roku
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 w-full">
      {/* 2. Pełnoekranowy kontener dla napisu robisolutionsit.com */}
      {/* Dodano border-b border-white/10 pod napisem */}
      <div className="text-center px-4 bg-black/30 opacity-30 py-4 lg:py-32 border-b border-white/10">
        <h1
          className="font-extrabold 
                       text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[11rem]
                       bg-gradient-to-r from-sky-400 to-purple-500 
                       text-transparent bg-clip-text 
                       opacity-10 
                       text-stroke break-words"
        >
          robisolutionsit.com
        </h1>
      </div>

      {/* 3. Kontener dla reszty treści - ograniczony (max-w-[1200px]) i wyśrodkowany. */}
      <div className="max-w-[1200px] mx-auto px-4 mt-12 container flex flex-col sm:flex-row sm:justify-between justify-center items-center gap-10">
        {/* Dynamiczna data z JS */}
        <p className="text-gray-400">© {currentYear}. All rights reserved.</p>

        {/* IKONKI SOCIAL MEDIÓW - Ciemny kolor, lekki hover */}
        <ul className="flex flex-row gap-6">
          {/* GitHub */}
          <li>
            <a href="#">
              <AiFillGithub
                size={30}
                className="text-gray-500 hover:text-sky-300 transition duration-300"
              />
            </a>
          </li>

          {/* YouTube */}
          <li>
            <a href="#">
              <AiFillYoutube
                size={30}
                className="text-gray-500 hover:text-sky-300 transition duration-300"
              />
            </a>
          </li>

          {/* Facebook */}
          <li>
            <a href="#">
              <AiFillFacebook
                size={30}
                className="text-gray-500 hover:text-sky-300 transition duration-300"
              />
            </a>
          </li>

          {/* Instagram */}
          <li>
            <a href="#">
              <AiFillInstagram
                size={30}
                className="text-gray-500 hover:text-sky-300 transition duration-300"
              />
            </a>
          </li>

          {/* LinkedIn */}
          <li>
            <a href="#">
              <AiFillLinkedin
                size={30}
                className="text-gray-500 hover:text-sky-300 transition duration-300"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
