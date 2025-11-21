"use client";

import React from "react";
import { FaTachometerAlt } from "react-icons/fa";

const InternetSpeedTest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Nagłówek i instrukcje */}
      <div className="text-center mb-8 p-6 bg-gray-800 rounded-lg shadow-xl">
        <FaTachometerAlt className="text-5xl text-blue-500 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-white mb-2">
          Test Prędkości Internetu
        </h1>
        <p className="text-gray-400">
          Używamy zewnętrznego serwisu do dokładnego pomiaru prędkości Twojego
          łącza (Download/Upload).
        </p>
      </div>

      {/* Kontener iFrame z testem prędkości */}
      <div className="w-full max-w-lg md:max-w-xl lg:max-w-3xl h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/*
          UWAGA: URL poniżej jest przykładem i może wymagać modyfikacji 
          lub użycia oficjalnego widgetu/API. 
          Dla testów często używa się popularnych, publicznych serwisów.
        */}
        <iframe
          src="https://fast.com/" // Przykład: Fast.com od Netflixa jest bardzo prosty i automatycznie się uruchamia
          title="Internet Speed Test"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          className="border-none"
        />
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Wyniki mogą się różnić w zależności od obciążenia serwera i aktualnej
        sieci.
      </p>
    </div>
  );
};

export default InternetSpeedTest;
