"use client";
import { motion } from "framer-motion";
import profilepic from "../../public/assets/profilepic.png";
import Image from "next/image";

export const Hero = () => {
  // Funkcja do płynnego przewijania
  const handleScroll = () => {
    const nextSection = document.getElementById("work"); // Upewnij się, że następna sekcja ma to ID
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative overflow-clip min-h-screen text-white bg-slate-950"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(160, 174, 192, 0.08) 1px, transparent 0),
          linear-gradient(to bottom, #020617, #172554 35%, #2563eb 55%, #60a5fa 85%)
        `,
        backgroundSize: `25px 25px, 100% 100%`,
      }}
    >
      <div className="absolute w-[110vw] h-[60px] md:h-[80px] lg:h-[350px] rounded-[50%] left-1/2 -translate-x-1/2 top-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 bg-[radial-gradient(closest-side,#020617_85%,#3b82f6)] border-[1px] border-blue-400/30" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[1200px] bg-blue-600/60 rounded-full blur-3xl"
          animate={{
            scale: [1, 4, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 pt-12 pb-24">
        <div className="flex flex-col items-center justify-center text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1}}
            className="relative mb-8 mt-24 flex items-center justify-center"
          >
            <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(22,163,175,0.3),transparent_70%)] blur-5xl"></div>
            <Image
               src={profilepic}
              alt="profile pic"
              width={250}
              height={250}
              className="relative z-10 rounded-full object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl font-bold"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl text-white/80 max-w-lg mx-auto mb-6 drop-shadow-lg">
              Hi, I am <br /> John{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Doe
              </span>
            </h1>
            <p className="text-md md:text-xl md:pt-2 lg:pt-12 text-white max-w-lg mx-auto leading-relaxed mb-6">
              I am a fullstack developer focusing on creating websites that
              provides user with best experience
            </p>

            <div className="flex gap-8 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 font-bold bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-sm shadow-blue-950 text-blue-50 duration-300 cursor-pointer"
              >
                Contact Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 border border-blue-400 rounded-full duration-300 cursor-pointer"
              >
                View Work
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};