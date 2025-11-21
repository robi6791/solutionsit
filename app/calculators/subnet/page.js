"use client";

import React, { useState, useEffect } from "react";

// --- FUNKCJE POMOCNICZE DO OBLICZEŃ SIEĆIOWYCH ---

const ipToNumber = (ipString) => {
  const parts = ipString.split(".").map(Number);
  if (parts.length !== 4) return 0;
  return (
    ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
  );
};

const numberToIp = (ipNumber) => {
  return [
    (ipNumber >>> 24) & 0xff,
    (ipNumber >>> 16) & 0xff,
    (ipNumber >>> 8) & 0xff,
    ipNumber & 0xff,
  ].join(".");
};

const generateSubnetMask = (cidr) => {
  if (cidr < 0 || cidr > 32) return 0;
  return (~0 << (32 - cidr)) >>> 0;
};

const SubnetCalculator = () => {
  const [ipInput, setIpInput] = useState("192.168.1.100");
  const [cidrInput, setCidrInput] = useState(24);
  const [results, setResults] = useState({});
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------
  // 1. GŁÓWNA LOGIKA OBLICZENIOWA
  // ---------------------------------------------------------------------
  const calculateSubnet = () => {
    setError("");
    const cidr = parseInt(cidrInput);

    // Walidacja CIDR i IP (pominięto dla zwięzłości, ale obecna w poprzedniej wersji)
    if (isNaN(cidr) || cidr < 1 || cidr > 32) {
      setError("Niepoprawny CIDR (powinien być między 1 a 32).");
      setResults({});
      return;
    }
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (
      !ipRegex.test(ipInput) ||
      ipInput.split(".").some((o) => Number(o) > 255)
    ) {
      setError("Niepoprawny format adresu IP (np. 192.168.1.100).");
      setResults({});
      return;
    }

    try {
      const ipNumber = ipToNumber(ipInput);
      const subnetMaskNumber = generateSubnetMask(cidr);
      const wildcardNumber = ~subnetMaskNumber >>> 0;

      const networkNumber = (ipNumber & subnetMaskNumber) >>> 0;
      const networkAddress = numberToIp(networkNumber);

      const broadcastNumber = (networkNumber | wildcardNumber) >>> 0;
      const broadcastAddress = numberToIp(broadcastNumber);

      const bitsForHosts = 32 - cidr;
      const totalHosts = Math.pow(2, bitsForHosts);
      const usableHosts = totalHosts <= 2 ? 0 : totalHosts - 2;

      let firstUsableHost = "N/A";
      let lastUsableHost = "N/A";

      if (usableHosts > 0) {
        firstUsableHost = numberToIp(networkNumber + 1);
        lastUsableHost = numberToIp(broadcastNumber - 1);
      } else if (cidr === 31) {
        // Specjalny przypadek /31
        firstUsableHost = networkAddress;
        lastUsableHost = broadcastAddress;
      }

      const toBinaryString = (num) => {
        return num.toString(2).padStart(32, "0");
      };

      setResults({
        cidr: cidr,
        subnetMask: numberToIp(subnetMaskNumber),
        networkAddress: networkAddress,
        broadcastAddress: broadcastAddress,
        totalHosts: totalHosts,
        usableHosts: usableHosts,
        firstUsableHost: firstUsableHost,
        lastUsableHost: lastUsableHost,
        ipBinary: toBinaryString(ipNumber),
        maskBinary: toBinaryString(subnetMaskNumber),
        networkBinary: toBinaryString(networkNumber),
      });
    } catch (e) {
      console.error("Błąd obliczeniowy:", e);
      setError("Wystąpił nieznany błąd podczas obliczeń.");
      setResults({});
    }
  };

  useEffect(() => {
    calculateSubnet();
  }, [ipInput, cidrInput]);

  // ---------------------------------------------------------------------
  // 2. RENDEROWANIE JSX (Styl Dark Mode)
  // ---------------------------------------------------------------------
  const inputStyle =
    "p-3 border rounded-lg text-lg focus:ring-cyan-500 focus:border-cyan-500 w-full bg-gray-700 border-gray-600 text-white";
  const labelStyle = "block text-cyan-400 font-semibold mb-1";

  return (
    // Używamy bg-gray-900 jako tła głównego kontenera
    <div className="flex flex-col items-center justify-start p-8 bg-gray-900 min-h-screen text-white">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">
          Kalkulator Subnetingu 🌐
        </h1>

        {/* Sekcja Wejścia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 border border-gray-600 rounded-lg bg-gray-700">
          <div className="md:col-span-2">
            <label className={labelStyle}>Adres IP</label>
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              className={inputStyle}
              placeholder="np. 192.168.1.100"
            />
          </div>

          <div>
            <label className={labelStyle}>Maska CIDR (/)</label>
            <input
              type="number"
              value={cidrInput}
              onChange={(e) => setCidrInput(e.target.value)}
              className={inputStyle}
              min="1"
              max="32"
            />
          </div>
        </div>

        {/* Komunikat o błędzie */}
        {error && (
          <div className="mb-4 p-3 bg-red-800 border border-red-600 text-red-100 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Sekcja Wyników */}
        {results.networkAddress && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-500">
              Wyniki Subnetingu
            </h2>

            {/* --- WYŚWIETLANIE BINARNE --- */}
            <h3 className="text-xl font-bold mb-3 text-center pt-4 border-t border-gray-600 mt-4 text-cyan-400">
              Reprezentacja Binarna
            </h3>
            <BinaryDisplay
              label={`Adres IP (/${results.cidr})`}
              binaryString={results.ipBinary}
              cidr={results.cidr}
            />
            <BinaryDisplay
              label="Maska Podsieci"
              binaryString={results.maskBinary}
              cidr={results.cidr}
            />
            <BinaryDisplay
              label="Adres Sieci"
              binaryString={results.networkBinary}
              cidr={results.cidr}
            />
            {/* --- KONIEC WYŚWIETLANIA BINARNEGO --- */}

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg text-white">
                <tbody>
                  <ResultRow
                    label="Adres Sieci (Network ID)"
                    value={results.networkAddress}
                  />
                  <ResultRow
                    label="Maska Podsieci"
                    value={results.subnetMask}
                  />
                  <ResultRow
                    label="Adres Broadcast"
                    value={results.broadcastAddress}
                  />

                  <ResultRow
                    label="Całkowita liczba Adresów"
                    value={results.totalHosts.toLocaleString()}
                    emphasize={true}
                  />
                  <ResultRow
                    label="Użyteczna liczba Hostów"
                    value={results.usableHosts.toLocaleString()}
                    emphasize={true}
                  />

                  <ResultRow
                    label="Pierwszy Adres Hosta"
                    value={results.firstUsableHost}
                  />
                  <ResultRow
                    label="Ostatni Adres Hosta"
                    value={results.lastUsableHost}
                  />
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-600">
              <h3 className="text-xl font-bold mb-3 text-center text-cyan-400">
                Kluczowe Formuły
              </h3>
              <div className="text-gray-400 text-center text-sm space-y-2">
                <p>
                  **Adres Sieci (Network ID)** = IP logiczne AND Maska Podsieci
                </p>
                <p>
                  **Adres Broadcast** = Network ID logiczne OR NOT(Maska
                  Podsieci)
                </p>
                <p>**Liczba Adresów** = 2^(32 - CIDR)</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Komponent pomocniczy do wyświetlania wierszy tabeli (dostosowany do dark mode)
const ResultRow = ({ label, value, emphasize = false }) => (
  <tr
    className={
      emphasize
        ? "bg-indigo-900/30 font-bold"
        : "border-t border-gray-600 hover:bg-gray-600"
    }
  >
    <td className="py-3 px-4 w-1/2 text-gray-300">{label}</td>
    <td className="py-3 px-4 w-1/2 text-right font-mono text-lg">{value}</td>
  </tr>
);

// --- KOMPONENT POMOCNICZY DO WYŚWIETLANIA BINARNEGO ADRESU (Koloryzacja) ---
const BinaryDisplay = ({ label, binaryString, cidr }) => {
  // Dzieli ciąg binarny na 4 oktety
  const octets = [
    binaryString.substring(0, 8),
    binaryString.substring(8, 16),
    binaryString.substring(16, 24),
    binaryString.substring(24, 32),
  ];

  const networkEnd = cidr;

  return (
    <div className="mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 font-mono text-sm overflow-x-auto">
      <div className="font-semibold text-gray-300 mb-1">{label}</div>
      <div className="whitespace-nowrap">
        {octets.map((octet, index) => {
          const start = index * 8;
          const end = (index + 1) * 8;

          let networkPart = "";
          let hostPart = "";

          // Logika kolorowania:
          if (networkEnd >= end) {
            networkPart = octet; // Cały oktet jest siecią
          } else if (networkEnd > start && networkEnd < end) {
            networkPart = octet.substring(0, networkEnd - start); // Część sieć
            hostPart = octet.substring(networkEnd - start); // Część host
          } else if (networkEnd <= start) {
            hostPart = octet; // Cały oktet to host
          }

          return (
            <span key={index} className="mr-2">
              {/* Część sieciowa - Niebieski (jak akcent w MicTest) */}
              {networkPart && (
                <span className="text-blue-500 font-bold">{networkPart}</span>
              )}
              {/* Część hosta - Czerwony (jak stan stop w MicTest) */}
              {hostPart && <span className="text-red-500">{hostPart}</span>}
              {/* Separator */}
              {index < 3 && <span className="text-gray-500">.</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SubnetCalculator;
