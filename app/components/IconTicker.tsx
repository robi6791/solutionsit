"use client";

import { motion } from "framer-motion";
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
  SiBootstrap,
  SiMongodb,
  SiZod,
  SiShadcnui,
} from "react-icons/si";

// Lista ikon, które będą animowane
const stackIcons = [
  { icon: FaReact, color: "#61DAFB", alt: "React Logo" },
  { icon: SiNextdotjs, color: "#FFFFFF", alt: "Next.js Logo" },
  { icon: SiTypescript, color: "#3178C6", alt: "TypeScript Logo" },
  { icon: FaNodeJs, color: "#339933", alt: "Node.js Logo" },

  { icon: SiHtml5, color: "#E34F26", alt: "HTML5 Logo" },
  { icon: SiCss3, color: "#1572B6", alt: "CSS3 Logo" },
  { icon: SiJavascript, color: "#F7DF1E", alt: "JavaScript Logo" },
  { icon: SiBootstrap, color: "#7952B3", alt: "Bootstrap Logo" },

  { icon: SiStrapi, color: "#2f2e8b", alt: "Strapi Logo" },
  { icon: SiFirebase, color: "#FFCA28", alt: "Firebase Logo" },
  { icon: SiTailwindcss, color: "#06B6D4", alt: "Tailwind CSS Logo" },

  { icon: SiMongodb, color: "#47A248", alt: "MongoDB Logo" },
  { icon: SiPostgresql, color: "#336791", alt: "PostgreSQL Logo" },
  { icon: SiPrisma, color: "#48B47E", alt: "Prisma Logo" },
  { icon: SiZod, color: "#3178C6", alt: "Zod Logo" },
  { icon: SiShadcnui, color: "#FFFFFF", alt: "Shadcn/ui Logo" },
];

// Duplikujemy listę trzykrotnie dla efektu nieskończonej taśmy
const duplicatedIcons = [...stackIcons, ...stackIcons, ...stackIcons];

const IconTicker = () => {
  return (
    <section
      className="py-2 lg:py-10 bg-black/70 backdrop-blur-md shadow-lg lg:shadow-xl shadow-blue-400 mt- lg:mt-0 mb-2 lg:mb-8"
      aria-hidden="true"
    >
      <div className="container mx-auto">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,_transparent,_black_15%,_black_85%,_transparent)]">
          <motion.div
            className="flex gap-32 flex-none pr-32"
            animate={{ translateX: "-33.33%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {duplicatedIcons.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={`${item.alt}-${index}`}
                  className="flex-none flex items-center justify-center p-2"
                >
                  <IconComponent
                    className="w-6 lg:w-16 h-6 lg:h-16 opacity-80 transition-opacity duration-300"
                    style={{
                      color: item.color,
                      filter: `drop-shadow(0 0 5px ${item.color}B3)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IconTicker;
