"use client";

import React, { useState, useCallback, useEffect } from "react";
import { FaBolt, FaEquals } from "react-icons/fa";

// Stałe
const UNIT_OPTIONS = ["Ω", "kΩ", "MΩ"]; // Jednostki rezystancji
const VOLTAGE_UNIT = "V"; // Jednostka napięcia

// Funkcja konwertująca jednostki rezystancji na Ohmy
const toOhms = (value, unit) => {
  if (unit === "kΩ") return value * 1000;
  if (unit === "MΩ") return value * 1000000;
  return value;
};

// Funkcja konwertująca Ohmy na format z jednostką (dla wyświetlania)
const formatOhms = (ohms) => {
  if (isNaN(ohms)) return "N/A";
  if (ohms >= 1000000)
    return `${(ohms / 1000000).toFixed(3).replace(/\.000$/, "")} MΩ`;
  if (ohms >= 1000)
    return `${(ohms / 1000).toFixed(3).replace(/\.000$/, "")} kΩ`;
  return `${ohms.toFixed(3).replace(/\.000$/, "")} Ω`;
};

// Lista możliwych celów obliczeń
const CALCULATION_TARGETS = [
  { key: "Vout", label: "Oblicz Vout" },
  { key: "Vin", label: "Oblicz Vin" },
  { key: "R1", label: "Oblicz R1" },
  { key: "R2", label: "Oblicz R2" },
];

const VoltageDividerCalculator = () => {
  // wartości wpisywane przez użytkownika
  const [values, setValues] = useState({
    Vout: { value: "", unit: VOLTAGE_UNIT, isTarget: false },
    Vin: { value: "5", unit: VOLTAGE_UNIT, isTarget: false },
    R1: { value: "10", unit: "kΩ", isTarget: false },
    R2: { value: "10", unit: "kΩ", isTarget: false },
  });

  // wyniki obliczeń (oddzielne od values!)
  const [results, setResults] = useState({
    Vout: "",
    Vin: "",
    R1: "",
    R2: "",
  });

  const [targetKey, setTargetKey] = useState("Vout");
  const [error, setError] = useState("");

  // --- FUNKCJA OBLICZENIOWA Z WALIDACJĄ ---
  const calculateDivider = useCallback(() => {
    setError("");
    let result = null;

    const Vout_val = parseFloat(values.Vout.value);
    const Vin_val = parseFloat(values.Vin.value);
    const R1_val = toOhms(parseFloat(values.R1.value), values.R1.unit);
    const R2_val = toOhms(parseFloat(values.R2.value), values.R2.unit);

    const requiredValues = [Vout_val, Vin_val, R1_val, R2_val].filter(
      (v) => !isNaN(v)
    ).length;

    if (requiredValues < 3) {
      setError("Wprowadź co najmniej 3 wartości, aby wykonać obliczenia.");
      setResults((prev) => ({
        ...prev,
        [targetKey]: "",
      }));
      return;
    }

    try {
      switch (targetKey) {
        case "Vout":
          if (R1_val + R2_val === 0)
            throw new Error("Suma R1 i R2 nie może być zerem.");
          result = Vin_val * (R2_val / (R1_val + R2_val));
          break;

        case "Vin":
          if (R2_val === 0)
            throw new Error("R2 nie może być zerem przy obliczaniu Vin.");
          result = Vout_val * ((R1_val + R2_val) / R2_val);
          break;

        case "R1":
          if (Vout_val <= 0) throw new Error("Vout musi być większe od 0 V.");
          if (Vout_val >= Vin_val)
            throw new Error(
              "W pasywnym dzielniku napięcia Vout musi być mniejsze niż Vin. Zmniejsz Vout lub zwiększ Vin."
            );
          result = R2_val * (Vin_val / Vout_val - 1);
          break;

        case "R2":
          if (Vout_val <= 0) throw new Error("Vout musi być większe od 0 V.");
          if (Vout_val >= Vin_val)
            throw new Error(
              "W pasywnym dzielniku napięcia Vout musi być mniejsze niż Vin. Zmniejsz Vout lub zwiększ Vin."
            );
          result = R1_val * (Vout_val / (Vin_val - Vout_val));
          break;

        default:
          break;
      }

      if (result < 0 && (targetKey === "R1" || targetKey === "R2")) {
        throw new Error(
          "Wynik rezystancji jest ujemny, co jest niemożliwe w dzielniku pasywnym."
        );
      }
      if (!isFinite(result)) throw new Error("Dzielenie przez zero.");

      // ZAPISUJEMY TYLKO DO results, NIE DO values -> brak pętli
      setResults((prev) => ({
        ...prev,
        [targetKey]: targetKey.startsWith("R")
          ? formatOhms(result)
          : result.toFixed(3),
      }));
      setError("");
    } catch (e) {
      setError(`Błąd obliczeniowy: ${e.message}`);
      setResults((prev) => ({
        ...prev,
        [targetKey]: "",
      }));
    }
  }, [values, targetKey]);

  // auto-obliczanie przy zmianie wejść / celu
  useEffect(() => {
    calculateDivider();
  }, [values, targetKey, calculateDivider]);

  // --- RENDEROWANIE JSX ---

  const handleTargetChange = (key) => {
    setTargetKey(key);
    const newValues = Object.keys(values).reduce((acc, curr) => {
      acc[curr] = { ...values[curr], isTarget: curr === key };
      return acc;
    }, {});
    setValues(newValues);
  };

  const handleValueChange = (key, value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    setValues((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: numericValue },
    }));
  };

  const handleUnitChange = (key, unit) => {
    setValues((prev) => ({
      ...prev,
      [key]: { ...prev[key], unit },
    }));
  };

  const inputStyle = (isTarget) =>
    `p-3 border rounded-lg text-lg font-mono w-full ${
      isTarget ? "bg-indigo-900/50 ring-2 ring-indigo-500" : "bg-gray-700"
    } border-gray-600 text-white`;

  const labelStyle = (isTarget) =>
    `block font-semibold mb-1 ${
      isTarget ? "text-green-400" : "text-indigo-400"
    }`;

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-gray-900 min-h-screen text-white">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-400 flex items-center justify-center space-x-3">
          <FaBolt />
          <span>Kalkulator Dzielnika Napięcia</span>
        </h1>

        {/* Sekcja Wyboru Celu */}
        <div className="mb-6 p-4 bg-gray-700 rounded-lg border-l-4 border-indigo-500">
          <label className="block text-lg font-semibold text-gray-300 mb-3">
            Wybierz, co chcesz obliczyć:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CALCULATION_TARGETS.map((target) => (
              <button
                key={target.key}
                onClick={() => handleTargetChange(target.key)}
                className={`p-2 rounded-lg font-semibold transition ${
                  target.key === targetKey
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                }`}
              >
                {target.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-800 border border-red-600 text-red-100 rounded-md text-center">
            {error}
          </div>
        )}

        {/* WZÓR I KONTROLKI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 border border-gray-600 rounded-xl bg-gray-700">
          {/* Elementy Dzielnika */}
          {Object.keys(values).map((key) => {
            const isTarget = key === targetKey;
            const isResistance = key.startsWith("R");
            const isCalculated = isTarget && results[key] && !error;

            return (
              <div key={key}>
                <label className={labelStyle(isTarget)} htmlFor={key}>
                  {key}{" "}
                  {isTarget && (
                    <FaEquals className="inline text-green-400 ml-1" />
                  )}
                </label>
                <div className="flex">
                  <input
                    id={key}
                    type="text"
                    value={isTarget ? results[key] : values[key].value}
                    onChange={(e) =>
                      !isTarget && handleValueChange(key, e.target.value)
                    }
                    className={inputStyle(isTarget)}
                    readOnly={isTarget}
                    placeholder={isTarget ? "Obliczane..." : "Wprowadź wartość"}
                  />
                  <div className="ml-2 w-16">
                    {isResistance ? (
                      <select
                        value={values[key].unit}
                        onChange={(e) => handleUnitChange(key, e.target.value)}
                        disabled={isTarget}
                        className={`p-3 border rounded-lg w-full h-full ${
                          isTarget ? "bg-gray-600" : "bg-gray-700"
                        } border-gray-600 text-white`}
                      >
                        {UNIT_OPTIONS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="p-3 border rounded-lg bg-gray-700 border-gray-600 text-white flex items-center justify-center h-full">
                        {VOLTAGE_UNIT}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wzór i Informacje */}
        <div className="mt-8 pt-6 border-t border-gray-600">
          <h2 className="text-xl font-bold mb-3 text-center text-cyan-400">
            Wzór Podstawowy
          </h2>
          <p className="text-center text-lg font-mono text-gray-300">
            Vout = Vin ⋅ R₂ / (R₁ + R₂)
          </p>
          <p className="mt-4 text-sm text-gray-400 text-center">
            <strong>Uwaga:</strong> Dzielnik napięcia jest obwodem pasywnym i
            zawsze obniża napięcie (Vout jest zawsze mniejsze niż Vin). Nie
            powinien być używany do zasilania urządzeń o znacznym poborze prądu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoltageDividerCalculator;
