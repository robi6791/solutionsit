"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

// Lista scen testowych (Kolory i Wzory)
const TEST_SCENES = [
  { name: "Czerwony", style: { backgroundColor: "#FF0000" } },
  { name: "Zielony", style: { backgroundColor: "#00FF00" } },
  { name: "Niebieski", style: { backgroundColor: "#0000FF" } },
  { name: "Biały (Martwe Piksele)", style: { backgroundColor: "#FFFFFF" } },
  { name: "Czarny (Backlight Bleed)", style: { backgroundColor: "#000000" } },

  // Nowe testy geometryczne i gradientowe:
  {
    name: "Siatka Drobna (Geometria)",
    style: {
      backgroundImage:
        "repeating-linear-gradient(0deg, #333, #333 1px, transparent 1px, transparent 19px), repeating-linear-gradient(90deg, #333, #333 1px, transparent 1px, transparent 19px)",
      backgroundColor: "#FFF", // Białe tło pod siatką
      backgroundSize: "20px 20px", // Rozmiar komórki siatki 20x20px
    },
  },
  {
    name: "Pasy Pionowe (Ostrość/Mora)",
    style: {
      // Bardzo cienkie pasy biało-czarne
      backgroundImage: "linear-gradient(to right, #FFF 50%, #000 50%)",
      backgroundSize: "2px 2px",
    },
  },
  {
    name: "Pasy Szare (Gradacja/Banding)",
    style: {
      // Płynny gradient od czerni do bieli
      backgroundImage: "linear-gradient(to right, #000 0%, #FFF 100%)",
      backgroundColor: "#000",
    },
  },
];

const INTERVAL_MS = 3000; // 3 sekundy na planszę

const LCDMonitorTest = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const intervalRef = useRef(null);
  const testContainerRef = useRef(null);

  const currentScene = TEST_SCENES[sceneIndex];

  // ==================== ZARZĄDZANIE EKRANEM ====================

  const updateFullscreenStatus = useCallback(() => {
    if (typeof document !== "undefined") {
      setIsFullscreen(!!document.fullscreenElement);
    }
  }, []);

  const requestFullscreen = useCallback(() => {
    if (typeof document !== "undefined" && testContainerRef.current) {
      const element = testContainerRef.current;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (typeof document !== "undefined") {
      try {
        if (!document.fullscreenElement) return;

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } catch (error) {
        console.error("Błąd podczas próby wyjścia z pełnego ekranu:", error);
      }
    }
  }, []);

  // ==================== ZARZĄDZANIE TESTEM ====================

  const stopTest = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const nextStep = useCallback(() => {
    setSceneIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      // Sprawdzenie, czy test się skończył
      if (nextIndex >= TEST_SCENES.length) {
        stopTest();
        setIsTestFinished(true);
        exitFullscreen(); // Wychodzi z Fullscreen, aby pokazać ekran końcowy
        return TEST_SCENES.length - 1;
      }
      return nextIndex;
    });
  }, [stopTest, exitFullscreen]);

  const startTest = useCallback(() => {
    if (intervalRef.current) return;

    // Reset w razie potrzeby
    setSceneIndex(0);
    setIsTestFinished(false);

    // Ustawienie interwału
    intervalRef.current = setInterval(() => {
      nextStep();
    }, INTERVAL_MS);
  }, [nextStep]);

  // ==================== OBSŁUGA ZDARZEŃ ====================

  // Obsługa klawiszy (Esc = Stop/Wyjście)
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        stopTest();
        exitFullscreen();
        setIsTestFinished(true); // Ustawienie zakończenia testu na wypadek wczesnego wyjścia
      }
      updateFullscreenStatus();
    },
    [stopTest, updateFullscreenStatus, exitFullscreen]
  );

  // Obsługa kliknięcia (Główna akcja)
  const handleClick = useCallback(() => {
    if (isTestFinished) {
      // Restart (restartuje interwał i przechodzi w Fullscreen)
      setIsTestFinished(false);
      startTest();
      requestFullscreen();
    } else {
      // W trakcie testu: Kliknięcie to wejście/wyjście z Fullscreen
      if (!isFullscreen) {
        requestFullscreen();
      } else {
        exitFullscreen();
      }
    }
  }, [
    isTestFinished,
    startTest,
    requestFullscreen,
    isFullscreen,
    exitFullscreen,
  ]);

  // ==================== CYKL ŻYCIA ====================

  useEffect(() => {
    // 1. Automatycznie uruchom test NATYCHMIAST po załadowaniu
    startTest();

    // 2. Ustawienie nasłuchiwania zdarzeń
    if (typeof document !== "undefined") {
      document.addEventListener("fullscreenchange", updateFullscreenStatus);
      document.addEventListener(
        "webkitfullscreenchange",
        updateFullscreenStatus
      );
      document.addEventListener("mozfullscreenchange", updateFullscreenStatus);
      document.addEventListener("msfullscreenchange", updateFullscreenStatus);

      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      stopTest(); // Czyszczenie interwału przy odmontowaniu

      if (typeof document !== "undefined") {
        document.removeEventListener(
          "fullscreenchange",
          updateFullscreenStatus
        );
        document.removeEventListener(
          "webkitfullscreenchange",
          updateFullscreenStatus
        );
        document.removeEventListener(
          "mozfullscreenchange",
          updateFullscreenStatus
        );
        document.removeEventListener(
          "msfullscreenchange",
          updateFullscreenStatus
        );
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [startTest, stopTest, updateFullscreenStatus, handleKeyDown]);

  // ==================== RENDEROWANIE ====================

  // Połącz stałe style z dynamicznymi stylami sceny
  const combinedSceneStyle = isTestFinished
    ? { backgroundColor: "#333333" } // Szare tło po zakończeniu
    : currentScene.style;

  const screenStyle = {
    ...combinedSceneStyle, // Dodanie stylów sceny
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: isFullscreen ? "none" : "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div ref={testContainerRef} style={screenStyle} onClick={handleClick}>
      {/* Warunek dla wyświetlania EKRANU KOŃCOWEGO */}
      {isTestFinished ? (
        <div className="p-8 rounded-lg bg-black/70 shadow-2xl backdrop-blur-sm text-center">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">
            TEST ZAKOŃCZONY
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Wszystkie sceny testowe zostały wyświetlone.
          </p>

          <p className="text-gray-400 mb-4 flex items-center justify-center space-x-2">
            <FaExternalLinkAlt />{" "}
            <span>
              Naciśnij **ESC**, aby wyjść z pełnego ekranu, lub kliknij przycisk
              poniżej.
            </span>
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              startTest();
              requestFullscreen();
            }}
            className="mt-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Uruchom Test Ponownie (Auto Start)
          </button>
        </div>
      ) : (
        // Podczas automatycznego testu wyświetlany jest tylko niewidoczny div.
        <div
          className={`p-4 rounded-lg transition-opacity duration-500 ease-in-out opacity-0`}
        >
          <span className="sr-only">Test Monitora: {currentScene.name}</span>
        </div>
      )}
    </div>
  );
};

export default LCDMonitorTest;
