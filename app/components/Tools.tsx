"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaCode,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaTools,
} from "react-icons/fa";
import { SiPostman } from "react-icons/si";

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

const Tools = () => {
  return (
    <section
      className="py-32 px-4 text-white bg-black relative z-10"
      aria-label="Narzędzia, z których korzystam na co dzień"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ANIMACJA TYLKO NA TYTUŁ – wjazd z lewej */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl">
            Tools <span className="text-blue-300"> narzędzia</span>
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-left text-sm md:text-base">
            W pracy korzystam z narzędzi, które przyspieszają development,
            testowanie i automatyzację – od VS Code i Git, przez Postmana, po
            narzędzia AI takie jak ChatGPT i Gemini.
          </p>
        </motion.div>

        {/* BEZ ANIMACJI NA IKONKACH */}
        <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-5 place-items-center">
          {tools.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center">
              <div className="relative mb-2">
                <div
                  className="absolute inset-0 rounded-md opacity-0 "
                  style={{
                    backgroundColor: tool.color,
                  
                  }}
                />
                <div className="relative p-3 rounded-lg border border-slate-800 bg-slate-950/10 shadow-xs shadow-blue-300">
                  <tool.icon
                    className="w-16 h-8"
                    style={{
                      color: tool.color,
                    
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-300 text-center">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
