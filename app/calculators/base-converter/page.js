"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaRecycle, FaMicrochip, FaCubes, FaEraser } from "react-icons/fa";

// Lista baz liczbowych
const BASES = [
  { name: "Dziesiętny (Decimal)", base: 10, prefix: "", placeholder: "12345" },
  {
    name: "Dwójkowy (Binary)",
    base: 2,
    prefix: "0b",
    placeholder: "11000000111001",
  },
  {
    name: "Szesnastkowy (Hexadecimal)",
    base: 16,
    prefix: "0x",
    placeholder: "3039",
  },
  { name: "Ósemkowy (Octal)", base: 8, prefix: "0o", placeholder: "30071" },
];

const BaseConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputBase, setInputBase] = useState(10);
  const [currentNumber, setCurrentNumber] = useState(null); // Liczba w formacie JS Number
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------
  // 1. GŁÓWNA LOGIKA KONWERSJI
  // ---------------------------------------------------------------------

  const convertInput = useCallback((value, base) => {
    setError("");
    // Usuwamy wszelkie spacje i prefiksy, aby poprawnie sparsować
    const cleanedValue = value.trim().replace(/^(0x|0b|0o)/i, "");

    if (!cleanedValue) {
      setCurrentNumber(null);
      return;
    }

    const num = parseInt(cleanedValue, base);

    if (isNaN(num)) {
      setError(`Niepoprawny znak dla bazy ${base}.`);
      setCurrentNumber(null);
    } else if (num < 0) {
      setError("Obsługiwane są tylko liczby nieujemne.");
      setCurrentNumber(null);
    } else if (num > Number.MAX_SAFE_INTEGER) {
      setError(
        "Liczba jest zbyt duża dla bezpiecznej reprezentacji JavaScript."
      );
      setCurrentNumber(num);
    } else {
      setCurrentNumber(num);
    }
  }, []);

  // ---------------------------------------------------------------------
  // 2. FUNKCJA CZYSZCZĄCA
  // ---------------------------------------------------------------------
  const handleClear = () => {
    setInputValue("");
    setCurrentNumber(null);
    setError("");
    setInputBase(10); // Opcjonalnie: reset do domyślnej bazy
  };

  // ---------------------------------------------------------------------
  // 3. EFEKT: Uruchamia konwersję za każdym razem, gdy zmienia się wejście
  // ---------------------------------------------------------------------
  useEffect(() => {
    convertInput(inputValue, inputBase);
  }, [inputValue, inputBase, convertInput]);

  // ---------------------------------------------------------------------
  // 4. FUNKCJA FORMATUJĄCA WYNIKI
  // ---------------------------------------------------------------------
  const formatResult = (baseItem) => {
    if (currentNumber === null) return "";

    let result = currentNumber.toString(baseItem.base);

    if (baseItem.prefix && result) {
      if (baseItem.base === 16) {
        result = result.toUpperCase();
      }
      return baseItem.prefix + result;
    }
    return result;
  };

  // ---------------------------------------------------------------------
  // 5. RENDEROWANIE JSX
  // ---------------------------------------------------------------------

  const handleInputChange = (e, base) => {
    const value = e.target.value;

    setInputBase(base);
    setInputValue(value);
  };

  const inputStyle =
    "p-3 border rounded-lg text-lg font-mono w-full bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500";
  const labelStyle = "block text-indigo-400 font-semibold mb-1";

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-gray-900 min-h-screen text-white">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-400 flex items-center justify-center space-x-3">
          <FaRecycle />
          <span>Konwerter Baz Liczbowych</span>
          <FaMicrochip />
        </h1>

        {/* Sekcja Objaśnienia i Przycisk Clear */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-700 rounded-lg border-l-4 border-indigo-500">
          <p className="text-sm text-gray-300 mr-4">
            Wprowadź liczbę w dowolnym polu, a pozostałe zostaną przeliczone
            automatycznie.
          </p>
          <button
            onClick={handleClear}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition"
          >
            <FaEraser />
            <span>Wyczyść</span>
          </button>
        </div>

        {/* Komunikat o błędzie */}
        {error && (
          <div className="mb-6 p-3 bg-red-800 border border-red-600 text-red-100 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Sekcja Wejścia/Wyników */}
        <div className="space-y-6">
          {BASES.map((item) => {
            const isInput = item.base === inputBase;

            // Wartość do wyświetlenia w polu
            let displayedValue;
            if (isInput) {
              // Jeśli to jest pole edytowane, używamy surowej wartości (która może być pusta)
              displayedValue = inputValue;
            } else {
              // W przeciwnym razie, pokazujemy wynik konwersji LUB pusty ciąg
              displayedValue = formatResult(item);
            }

            return (
              <div key={item.base}>
                <label className={labelStyle}>
                  {item.name} (Baza {item.base})
                </label>
                <input
                  type="text"
                  value={displayedValue}
                  // Słuchamy zmian TYLKO w tym polu, które jest aktualnie edytowane
                  onChange={(e) => handleInputChange(e, item.base)}
                  onFocus={(e) => {
                    setInputBase(item.base);
                    setInputValue(displayedValue);
                    e.target.select();
                  }}
                  className={`${inputStyle} ${
                    isInput
                      ? "bg-gray-600 ring-2 ring-indigo-500"
                      : "bg-gray-700"
                  }`}
                  placeholder={item.placeholder}
                />
              </div>
            );
          })}
        </div>

        {/* Sekcja Binarna (dla zaawansowanej wizualizacji) */}
        {currentNumber !== null && (
          <div className="mt-8 pt-6 border-t border-gray-600">
            <h2 className="text-xl font-bold mb-4 text-center text-indigo-400">
              Wartość Dziesiętna: {currentNumber.toLocaleString()}
            </h2>

            <BinaryBitsDisplay number={currentNumber} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- KOMPONENT POMOCNICZY: WIZUALIZACJA 32-BITOWA ---

const BinaryBitsDisplay = ({ number }) => {
  // Reprezentacja 32-bitowa liczby (zaokrąglamy do góry)
  const binary32 = number.toString(2).padStart(32, "0");

  // Dzielenie na oktety
  const octets = [
    binary32.substring(0, 8),
    binary32.substring(8, 16),
    binary32.substring(16, 24),
    binary32.substring(24, 32),
  ];

  const formatOctet = (octet) => {
    const oneStyle = "text-green-400 font-bold";
    const zeroStyle = "text-red-400/50";

    return (
      <span className="flex space-x-1">
        {[...octet].map((bit, i) => (
          <span key={i} className={bit === "1" ? oneStyle : zeroStyle}>
            {bit}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner overflow-x-auto">
      <h4 className="text-sm font-semibold text-gray-400 mb-2">
        32-bitowa Reprezentacja Binarna
      </h4>
      <div className="flex justify-between items-center text-xs sm:text-sm font-mono whitespace-nowrap space-x-4">
        {octets.map((octet, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex space-x-1 p-2 border border-gray-600 rounded-md bg-gray-800">
              {formatOctet(octet)}
            </div>
            <span className="text-gray-500 mt-1">{8 * (4 - index)}...</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseConverter;
