"use client";

import React, { useState, useCallback, useEffect } from "react";
import { FaCalculator } from "react-icons/fa";

// MAPOWANIE DLA FORMATU EIA-96 (wysoka precyzja, 1%)
// Pierwsze dwie cyfry dają kod wartości, trzecia cyfra to mnożnik.
const EIA_96_VALUES = {
  "01": 100,
  "02": 102,
  "03": 105,
  "04": 107,
  "05": 110,
  "06": 113,
  "07": 115,
  "08": 118,
  "09": 121,
  10: 124,
  11: 127,
  12: 130,
  13: 133,
  14: 137,
  15: 140,
  16: 143,
  17: 147,
  18: 150,
  19: 154,
  20: 158,
  21: 162,
  22: 165,
  23: 169,
  24: 174,
  25: 178,
  26: 182,
  27: 187,
  28: 191,
  29: 196,
  30: 200,
  31: 205,
  32: 210,
  33: 215,
  34: 221,
  35: 226,
  36: 232,
  37: 237,
  38: 243,
  39: 249,
  40: 255,
  41: 261,
  42: 267,
  43: 274,
  44: 280,
  45: 287,
  46: 294,
  47: 301,
  48: 309,
  49: 316,
  50: 324,
  51: 332,
  52: 340,
  53: 348,
  54: 357,
  55: 365,
  56: 374,
  57: 383,
  58: 392,
  59: 402,
  60: 412,
  61: 422,
  62: 432,
  63: 442,
  64: 453,
  65: 464,
  66: 475,
  67: 487,
  68: 499,
  69: 511,
  70: 523,
  71: 536,
  72: 549,
  73: 562,
  74: 576,
  75: 590,
  76: 604,
  77: 619,
  78: 634,
  79: 649,
  80: 665,
  81: 681,
  82: 698,
  83: 715,
  84: 732,
  85: 750,
  86: 768,
  87: 787,
  88: 806,
  89: 825,
  90: 845,
  91: 866,
  92: 887,
  93: 909,
  94: 931,
  95: 953,
  96: 976,
};

const EIA_96_MULTIPLIERS = {
  Z: 0.001,
  Y: 0.01,
  X: 0.1,
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
  E: 10000,
  F: 100000,
  S: 0.01,
  R: 0.1, // S i R to starsze oznaczenia
};

// Funkcja do formatowania rezystancji (np. 1000 -> 1 kΩ)
const formatResistance = (ohms) => {
  if (isNaN(ohms)) return "Błąd";
  if (ohms >= 1000000)
    return `${(ohms / 1000000).toFixed(3).replace(/\.000$/, "")} MΩ`;
  if (ohms >= 1000)
    return `${(ohms / 1000).toFixed(3).replace(/\.000$/, "")} kΩ`;
  // Poniżej 1 Ohma używamy Ω, unikając notacji naukowej
  return `${ohms.toFixed(3).replace(/\.000$/, "")} Ω`;
};

const SmdResistorCalculator = () => {
  const [code, setCode] = useState("103"); // Domyślny kod 10kΩ
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // --- LOGIKA OBLICZENIOWA ---
  const calculateSmdResistance = useCallback((smdCode) => {
    setError("");
    setResult(null);

    const normalizedCode = smdCode.toUpperCase().trim();
    if (!normalizedCode) return;

    // 1. Walidacja i rozpoznanie typu kodu
    const isNumeric = /^\d+$/.test(normalizedCode);
    const containsR = normalizedCode.includes("R");
    const containsEIA = /^\d{2}[A-Z]$/.test(normalizedCode);
    const len = normalizedCode.length;

    let resistance = 0;
    let tolerance = "";
    let codeType = "";

    try {
      if (containsEIA && len === 3) {
        // KOD EIA-96 (XXY) - np. 01A
        codeType = "EIA-96 (1%)";
        const valueCode = normalizedCode.substring(0, 2);
        const multiplierCode = normalizedCode.substring(2, 3);

        const value = EIA_96_VALUES[valueCode];
        const multiplier = EIA_96_MULTIPLIERS[multiplierCode];

        if (!value || !multiplier) {
          throw new Error("Nieznany kod wartości lub mnożnika EIA-96.");
        }

        resistance = value * multiplier;
        tolerance = "±1%";
      } else if (containsR) {
        // KOD Z LITERA R (R100, 1R0, 10R)
        codeType = "Literowy (z R)";
        const cleanCode = normalizedCode.replace("R", ".");
        resistance = parseFloat(cleanCode);
        tolerance = "Zwykle 5%";
        if (isNaN(resistance))
          throw new Error("Niepoprawna wartość po konwersji R.");
      } else if (isNumeric && (len === 3 || len === 4)) {
        // KOD CYFROWY (3-cyfrowy lub 4-cyfrowy) - np. 103, 1002
        codeType = `${len}-cyfrowy (3: 5%, 4: 1%)`;
        const is3Digit = len === 3;
        const numDigits = is3Digit ? 2 : 3;

        const valueStr = normalizedCode.substring(0, numDigits);
        const multiplierDigit = parseInt(
          normalizedCode.substring(numDigits),
          10
        );

        const value = parseInt(valueStr, 10);
        const multiplier = Math.pow(10, multiplierDigit);

        resistance = value * multiplier;
        tolerance = is3Digit ? "±5%" : "±1%";
      } else {
        setError("Nieznany format kodu. Użyj formatów: 103, 1002, 1R5, 01A.");
        return;
      }

      setResult({
        resistance,
        tolerance,
        codeType,
      });
    } catch (e) {
      setError(`Błąd obliczeń: ${e.message}`);
    }
  }, []);

  useEffect(() => {
    calculateSmdResistance(code);
  }, [code, calculateSmdResistance]);

  // --- RENDEROWANIE JSX ---
  const inputStyle =
    "p-3 border rounded-lg text-lg font-mono w-full bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500";
  const labelStyle = "block text-indigo-400 font-semibold mb-1";

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-gray-900 min-h-screen text-white">
      <div className="w-full max-w-xl bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-400 flex items-center justify-center space-x-3">
          <FaCalculator />
          <span>Kalkulator Kodów Rezystorów SMD</span>
        </h1>

        {/* Sekcja Objaśnienia */}
        <div className="p-4 mb-6 bg-gray-700 rounded-lg text-sm text-gray-300 border-l-4 border-indigo-500">
          <p>
            Wprowadź kod SMD (np. **103**, **47R5** lub **01A**) aby uzyskać
            wartość rezystancji.
          </p>
        </div>

        {/* Wejście */}
        <div className="mb-6">
          <label className={labelStyle}>Kod Rezystora SMD</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={inputStyle}
            placeholder="np. 103, 47R5, 01A"
          />
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-800 border border-red-600 text-red-100 rounded-md text-center">
            {error}
          </div>
        )}

        {/* WYNIKI */}
        {result && !error && (
          <div className="mt-6 p-6 bg-gray-700 rounded-xl shadow-lg border-t-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
              WYNIK
            </h2>

            <div className="text-center">
              <p className="text-lg text-gray-400 mb-2">
                Typ Kodu: **{result.codeType}**
              </p>
              <p className="text-4xl font-mono mb-2 text-white">
                {formatResistance(result.resistance)}
              </p>
              <p className="text-xl text-gray-300">
                Tolerancja: **{result.tolerance}**
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmdResistorCalculator;
