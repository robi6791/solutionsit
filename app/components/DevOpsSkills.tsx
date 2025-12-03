"use client";

import { motion } from "framer-motion";
import {
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaDocker,
  FaCogs,
} from "react-icons/fa";
import { SiNginx } from "react-icons/si";

const devopsSkills = [
  {
    name: "Docker / Docker CLI",
    icon: FaDocker,
    color: "#0db7ed",
    description:
      "Budowa obrazów, docker-compose, optymalizacja buildów, izolacja usług i środowisk.",
  },
  {
    name: "Nginx",
    icon: SiNginx,
    color: "#009639",
    description:
      "Reverse proxy, SSL/TLS, routing domen, load balancing, serwowanie statycznych zasobów.",
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
      "Graficzne zarządzanie kontenerami Docker, monitoring oraz deployment usług.",
  },
  {
    name: "Filebrowser",
    icon: FaServer,
    color: "#E5E5E5",
    description:
      "Panel webowy do zarządzania plikami na serwerze, uprawnienia, katalogi, szybki dostęp.",
  },
  {
    name: "virt-manager",
    icon: FaCogs,
    color: "#AAAAAA",
    description:
      "Zarządzanie maszynami KVM, storage, sieciami bridge i wirtualnymi środowiskami.",
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
      "Monitoring bezpieczeństwa, logi, SIEM, alerty i reagowanie na incydenty na serwerach.",
  },
  {
    name: "Networking (Wireshark, nmap)",
    icon: FaNetworkWired,
    color: "#1679A7",
    description:
      "Analiza ruchu, skanowanie portów i usług, diagnoza problemów sieciowych i bezpieczeństwa.",
  },
];

const DevOpsSkills = () => {
  return (
    <section
      className="py-32 px-4 text-white bg-black relative z-10"
      aria-label="Umiejętności DevOps i administracja serwerami"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ANIMACJA TYLKO NA TYTUŁ / OPIS */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-left mx-auto max-w-4xl">
            DevOps
            <span className="text-blue-300"> serwery i infrastruktura</span>
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto text-left mb-10 text-sm md:text-base">
            Administracja serwerami Linux, konteneryzacja, automatyzacja oraz
            bezpieczeństwo środowisk produkcyjnych.
          </p>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {devopsSkills.map((skill) => (
            // KAFELKI BEZ ANIMACJI
            <div
              key={skill.name}
              className="p-6 rounded-xl border border-slate-800 bg-slate-950/10 backdrop-blur-md transition-all shadow shadow-blue-300 overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div
                    className="absolute inset-1 blur-md opacity-40"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}`,
                    }}
                  />
                  <skill.icon
                    className="relative w-10 h-10"
                    style={{
                      color: skill.color,
                      filter: `drop-shadow(0 0 3px ${skill.color}B3)`,
                    }}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-1">{skill.name}</h3>
                  <p className="text-gray-400 text-sm">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevOpsSkills;
