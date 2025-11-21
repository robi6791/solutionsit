"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaMicrophone, FaVolumeUp, FaStop, FaPlay } from "react-icons/fa";

// Komponent do wizualizacji poziomu mikrofonu i testowania głośników
const MicSpeakerTest = () => {
  const [micState, setMicState] = useState("idle"); // idle, listening, error
  const [speakerState, setSpeakerState] = useState("idle"); // idle, playing
  const [micVolume, setMicVolume] = useState(0); // 0-100 dla wizualizacji
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // DANE TESTOWE DLA GŁOŚNIKÓW (prosty dźwięk sinusoidalny 440Hz)
  // Tego nie można w pełni zrealizować bez Tone.js lub Web Audio API
  // Dla prostoty, użyjemy wbudowanego w przeglądarkę API
  const createSineWave = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = "sine"; // Fale sinusoidalne są czyste i łatwe do usłyszenia
      oscillator.frequency.setValueAtTime(440, context.currentTime); // 440 Hz (A4)

      // Ustawienie głośności (zaczynamy od 0, żeby uniknąć szoku)
      gainNode.gain.setValueAtTime(0.0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.5); // Stopniowe narastanie

      oscillator.start();

      // Zatrzymanie po 2 sekundach
      setTimeout(() => {
        gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 2.0); // Stopniowe wyciszenie
        oscillator.stop(context.currentTime + 2.5);
        setSpeakerState("idle");
        context.close();
      }, 2500);

      return context;
    } catch (e) {
      console.error("Błąd Web Audio API:", e);
      alertUserMessage(
        "Błąd",
        "Twoja przeglądarka nie obsługuje Web Audio API lub wystąpił błąd."
      );
      setSpeakerState("error");
      return null;
    }
  };

  // --- Logika Mikrofonu ---
  const startMicTest = useCallback(async () => {
    if (micState === "listening") return;

    setMicState("listening");
    setMicVolume(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        analyserRef.current.getByteFrequencyData(dataArray);

        // Obliczanie średniej (reprezentacja głośności)
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Skalowanie do zakresu 0-100
        // Wartość 180 jest empiryczną wartością maksymalną dla normalnej rozmowy
        const volume = Math.min(100, Math.round((average / 180) * 100));
        setMicVolume(volume);

        animationFrameIdRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.error("Błąd dostępu do mikrofonu:", err);
      setMicState("error");
      alertUserMessage(
        "Błąd Mikrofonu",
        "Odmowa dostępu lub brak urządzenia. Upewnij się, że masz podłączony mikrofon i udzieliłeś zgody."
      );
    }
  }, [micState]);

  const stopMicTest = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.getTracks().forEach((track) => track.stop());
      audioRef.current = null;
    }
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    setMicState("idle");
    setMicVolume(0);
  }, []);

  // --- Logika Głośników ---
  const startSpeakerTest = () => {
    if (speakerState === "playing") return;
    setSpeakerState("playing");
    createSineWave();
  };

  // --- Efekty i Czyszczenie ---
  useEffect(() => {
    // Sprzątanie po odmontowaniu komponentu
    return () => {
      stopMicTest();
    };
  }, [stopMicTest]);

  // Zastępuje alert() niestandardowym komunikatem
  const alertUserMessage = (title, message) => {
    console.log(`[ALERT] ${title}: ${message}`);
    // W realnej aplikacji zamiast console.log, użyłbyś modalu.
    // Tutaj wyświetlimy informację w panelu:
    // Wprowadź stan `errorMessage` i wyświetl go.
    // Na razie zostawiamy jako console.log zgodnie z instrukcjami, by nie używać alert().
  };

  // Stylizacja wskaźnika głośności
  const volumeBarStyle = {
    width: `${micVolume}%`,
    transition: "width 0.1s ease-out",
    backgroundColor: micVolume > 50 ? "#10B981" : "#FBBF24", // Zielony gdy głośno, żółty gdy cicho
  };

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Test Mikrofonu i Głośników</h1>
      <p className="text-gray-400 mb-8 text-center">
        Sprawdź, czy Twój mikrofon poprawnie rejestruje dźwięk i czy głośniki
        odtwarzają ton testowy.
      </p>

      {/* --- SEKCJA MIKROFONU --- */}
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-2xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FaMicrophone className="text-cyan-400" />
            <span>Test Mikrofonu</span>
          </h2>
          {micState === "listening" ? (
            <button
              onClick={stopMicTest}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              <FaStop /> <span>Zatrzymaj</span>
            </button>
          ) : (
            <button
              onClick={startMicTest}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
              disabled={micState === "error"}
            >
              <FaMicrophone /> <span>Rozpocznij Test</span>
            </button>
          )}
        </div>

        {/* Wskaźnik Wizualny Głośności */}
        <div className="h-6 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
          <div style={volumeBarStyle} className="h-full"></div>
        </div>

        <p className="mt-3 text-sm text-gray-400">
          {micState === "listening"
            ? `Mów do mikrofonu. Poziom głośności: ${micVolume}%`
            : micState === "error"
            ? "Błąd: Brak dostępu lub mikrofonu."
            : 'Naciśnij "Rozpocznij Test", aby sprawdzić mikrofon.'}
        </p>
      </div>

      {/* --- SEKCJA GŁOŚNIKÓW --- */}
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FaVolumeUp className="text-cyan-400" />
            <span>Test Głośników</span>
          </h2>
          <button
            onClick={startSpeakerTest}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              speakerState === "playing"
                ? "bg-yellow-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={speakerState === "playing"}
          >
            {speakerState === "playing" ? <FaStop /> : <FaPlay />}
            <span>
              {speakerState === "playing"
                ? "Odtwarzanie..."
                : "Odtwórz Ton Testowy"}
            </span>
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          Test odtworzy krótki ton 440 Hz. Upewnij się, że wyraźnie go słyszysz
          w obu głośnikach/słuchawkach.
        </p>
      </div>

      <p className="mt-8 text-gray-600 text-sm">
        Uwaga: Do testowania mikrofonu potrzebna jest zgoda przeglądarki.
      </p>
    </div>
  );
};

export default MicSpeakerTest;
