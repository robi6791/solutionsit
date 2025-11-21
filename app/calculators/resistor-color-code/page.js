"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaPalette, FaMicrochip } from "react-icons/fa";

// MAPOWANIE KOLORÓW NA WARTOŚCI
// Wartość (Cyfra), Mnożnik (Potęga 10), Tolerancja (%)
const COLOR_MAP = {
  czarny: {
    digit: 0,
    multiplier: 1,
    tolerance: null,
    css: "bg-black text-white",
  },
  brązowy: {
    digit: 1,
    multiplier: 10,
    tolerance: 1,
    css: "bg-yellow-800 text-white",
  },
  czerwony: {
    digit: 2,
    multiplier: 100,
    tolerance: 2,
    css: "bg-red-600 text-white",
  },
  pomarańczowy: {
    digit: 3,
    multiplier: 1000,
    tolerance: null,
    css: "bg-orange-500 text-black",
  },
  żółty: {
    digit: 4,
    multiplier: 10000,
    tolerance: null,
    css: "bg-yellow-400 text-black",
  },
  zielony: {
    digit: 5,
    multiplier: 100000,
    tolerance: 0.5,
    css: "bg-green-600 text-white",
  },
  niebieski: {
    digit: 6,
    multiplier: 1000000,
    tolerance: 0.25,
    css: "bg-blue-600 text-white",
  },
  fioletowy: {
    digit: 7,
    multiplier: 10000000,
    tolerance: 0.1,
    css: "bg-purple-600 text-white",
  },
  szary: {
    digit: 8,
    multiplier: 100000000,
    tolerance: 0.05,
    css: "bg-gray-500 text-white",
  },
  biały: {
    digit: 9,
    multiplier: 1000000000,
    tolerance: null,
    css: "bg-white text-black",
  },
  złoty: {
    digit: null,
    multiplier: 0.1,
    tolerance: 5,
    css: "bg-yellow-500 text-black",
  },
  srebrny: {
    digit: null,
    multiplier: 0.01,
    tolerance: 10,
    css: "bg-gray-400 text-black",
  },
  brak: {
    digit: null,
    multiplier: null,
    tolerance: 20,
    css: "bg-transparent border border-dashed border-gray-500",
  },
};

// Funkcja do formatowania rezystancji (np. 1000 -> 1 kΩ)
const formatResistance = (ohms) => {
  if (ohms >= 1000000)
    return `${(ohms / 1000000).toFixed(2).replace(/\.00$/, "")} MΩ`;
  if (ohms >= 1000)
    return `${(ohms / 1000).toFixed(2).replace(/\.00$/, "")} kΩ`;
  return `${ohms.toFixed(2).replace(/\.00$/, "")} Ω`;
};

const ResistorCalculator = () => {
  // 4 paski: Pasek 1 (Cyfra), Pasek 2 (Cyfra), Pasek 3 (Mnożnik), Pasek 4 (Tolerancja)
  // Używamy kluczy z COLOR_MAP
  const [bandColors, setBandColors] = useState({
    band1: "brązowy", // Pasek 1
    band2: "czarny", // Pasek 2
    band3: "czerwony", // Mnożnik (1 kΩ)
    band4: "złoty", // Tolerancja (5%)
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // --- 1. LOGIKA OBLICZENIOWA ---
  const calculateResistance = useCallback(() => {
    setError("");
    const { band1, band2, band3, band4 } = bandColors;

    const val1 = COLOR_MAP[band1];
    const val2 = COLOR_MAP[band2];
    const val3 = COLOR_MAP[band3];
    const val4 = COLOR_MAP[band4];

    // Walidacja (paski cyfrowe nie mogą być Złoty/Srebrny/Brak)
    if (val1.digit === null || val2.digit === null) {
      setError("Paski cyfrowe (1 i 2) nie mogą być Złoty, Srebrny lub Brak.");
      setResult(null);
      return;
    }
    if (val4.tolerance === null) {
      setError(
        "Pasek tolerancji (4) musi mieć określoną tolerancję (np. Złoty, Brązowy)."
      );
      setResult(null);
      return;
    }

    // 1. Obliczenie wartości bazowej
    const valueDigit = val1.digit * 10 + val2.digit;

    // 2. Mnożnik
    const multiplier = val3.multiplier;

    // 3. Rezystancja
    const resistance = valueDigit * multiplier;
    const tolerance = val4.tolerance;

    // Obliczanie zakresu
    const minResistance = resistance * (1 - tolerance / 100);
    const maxResistance = resistance * (1 + tolerance / 100);

    setResult({
      resistance,
      tolerance,
      minResistance,
      maxResistance,
    });
  }, [bandColors]);

  useEffect(() => {
    calculateResistance();
  }, [calculateResistance]);

  // --- 2. KOMPONENTY WIZUALNE ---

  // Komponent paska wyboru koloru
  const ColorBandSelector = ({ bandKey, label, allowedMapKeys }) => {
    const allowedColors = allowedMapKeys.map((key) => ({
      key,
      ...COLOR_MAP[key],
      displayName: key.charAt(0).toUpperCase() + key.slice(1), // Wielka litera
    }));

    return (
      <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-400 mb-1">
          {label}
        </label>

        <select
          value={bandColors[bandKey]}
          onChange={(e) =>
            setBandColors((prev) => ({ ...prev, [bandKey]: e.target.value }))
          }
          className="p-2 border rounded-md bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 w-full text-center"
        >
          {allowedColors.map((color) => (
            <option key={color.key} value={color.key} className={color.css}>
              {color.displayName}
            </option>
          ))}
        </select>

        {/* Wartość liczbowa (dla paska 1 i 2) */}
        {(bandKey === "band1" || bandKey === "band2") &&
          COLOR_MAP[bandColors[bandKey]].digit !== null && (
            <p className="text-xs mt-1 text-indigo-400">
              Wartość: {COLOR_MAP[bandColors[bandKey]].digit}
            </p>
          )}
        {/* Wartość tolerancji (dla paska 4) */}
        {bandKey === "band4" &&
          COLOR_MAP[bandColors[bandKey]].tolerance !== null && (
            <p className="text-xs mt-1 text-green-400">
              Tolerancja: ±{COLOR_MAP[bandColors[bandKey]].tolerance}%
            </p>
          )}
      </div>
    );
  };

  // Komponent wizualizujący rezystor
  const ResistorVisual = () => {
    const bandKeys = ["band1", "band2", "band3", "band4"];
    return (
      <div className="flex justify-center items-center py-8">
        {/* Lewa nóżka */}
        <div className="w-10 h-0.5 bg-gray-600"></div>

        {/* Korpus Rezystora */}
        <div className="flex items-center h-8 bg-gray-300 rounded-lg shadow-inner px-1">
          {bandKeys.map((key, index) => (
            <div
              key={index}
              className={`w-2 h-7 mx-[2px] rounded-sm ${
                COLOR_MAP[bandColors[key]].css
              }`}
              style={{
                // Lekkie oddalenie paska tolerancji (band4)
                marginRight: index === 2 ? "12px" : "2px",
              }}
              title={`Pasek ${index + 1}: ${bandColors[key].toUpperCase()}`}
            ></div>
          ))}
        </div>

        {/* Prawa nóżka */}
        <div className="w-10 h-0.5 bg-gray-600"></div>
      </div>
    );
  };

  // --- 3. RENDEROWANIE JSX ---
  const allColors = Object.keys(COLOR_MAP);
  const digitAndMultiplierColors = allColors.filter(
    (key) =>
      COLOR_MAP[key].digit !== null || key === "złoty" || key === "srebrny"
  );
  const toleranceColors = allColors.filter(
    (key) => COLOR_MAP[key].tolerance !== null || key === "brak"
  );

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-gray-900 min-h-screen text-white">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-400 flex items-center justify-center space-x-3">
          <FaPalette />
          <span>Kalkulator Kodu Kolorów Rezystorów</span>
          <FaMicrochip />
        </h1>
        {/* WIZUALIZACJA REZYSTORA */}
        <ResistorVisual />
        [Image of a four-band resistor color code diagram]
        {error && (
          <div className="mb-6 p-3 bg-red-800 border border-red-600 text-red-100 rounded-md text-center">
            {error}
          </div>
        )}
        {/* SEKCJA WYBORU KOLORÓW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 border border-gray-700 rounded-lg bg-gray-700/50">
          <ColorBandSelector
            bandKey="band1"
            label="Pasek 1 (Cyfra)"
            allowedMapKeys={digitAndMultiplierColors.filter(
              (k) => k !== "złoty" && k !== "srebrny" && k !== "brak"
            )}
          />
          <ColorBandSelector
            bandKey="band2"
            label="Pasek 2 (Cyfra)"
            allowedMapKeys={digitAndMultiplierColors.filter(
              (k) => k !== "złoty" && k !== "srebrny" && k !== "brak"
            )}
          />
          <ColorBandSelector
            bandKey="band3"
            label="Pasek 3 (Mnożnik)"
            allowedMapKeys={digitAndMultiplierColors.filter(
              (k) => k !== "brak"
            )}
          />
          <ColorBandSelector
            bandKey="band4"
            label="Pasek 4 (Tolerancja)"
            allowedMapKeys={toleranceColors}
          />
        </div>
        {/* WYNIKI */}
        {result && !error && (
          <div className="mt-6 p-6 bg-gray-700 rounded-xl shadow-lg border-t-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
              WYNIK OBLICZEŃ
            </h2>

            <div className="text-center">
              <p className="text-4xl font-mono mb-2 text-white">
                {formatResistance(result.resistance)}
              </p>
              <p className="text-xl text-gray-300">
                Tolerancja: **±{result.tolerance}%**
              </p>

              <p className="mt-4 text-sm text-gray-400">
                Zakres: **{formatResistance(result.minResistance)}** do **
                {formatResistance(result.maxResistance)}**
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Wartość bazowa: {result.resistance.toLocaleString()} Ω
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResistorCalculator;
