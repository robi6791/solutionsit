"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const COOKIE_STORAGE_KEY = "cookies_status";
const COOKIE_STATUS_ACCEPTED = "accepted";
const COOKIE_STATUS_DECLINED = "declined";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    const status =
      typeof window !== "undefined"
        ? localStorage.getItem(COOKIE_STORAGE_KEY)
        : null;

    // Pierwsza wizyta – pokaż baner
    if (!status) {
      setIsVisible(true);
    }

    // Nasłuch na globalne "open-cookie-settings" (z footer button)
    const handleOpenSettings = () => {
      setIsVisible(true);
      setIsDetailsVisible(true);
      setIsSettingsVisible(true);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("open-cookie-settings", handleOpenSettings);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("open-cookie-settings", handleOpenSettings);
      }
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, COOKIE_STATUS_ACCEPTED);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, COOKIE_STATUS_DECLINED);
    // tutaj w razie czego można blokować skrypty analityczne
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 flex items-end justify-center">
      <div className="w-full max-w-4xl p-4 bg-gray-800 text-white shadow-2xl transition-all duration-500 ease-in-out relative">
        {/* Zamknięcie (tylko widok, nie zapisuje decyzji) */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
          aria-label="Zamknij komunikat o cookies"
        >
          <AiOutlineClose />
        </button>

        {/* Treść + przyciski */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-700 pb-4 mb-4">
          <div className="mb-4 md:mb-0 md:pr-4">
            <p className="text-sm">
              Używamy plików cookie w celu zapewnienia prawidłowego działania
              serwisu oraz (opcjonalnie) analizy ruchu. Możesz zaakceptować
              wszystkie cookies lub ograniczyć ich użycie.
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => setIsDetailsVisible(!isDetailsVisible)}
                className="text-sky-300 text-xs hover:underline focus:outline-none"
              >
                {isDetailsVisible
                  ? "Ukryj typy cookies"
                  : "Rodzaje używanych cookies"}
              </button>
              <button
                onClick={() => setIsSettingsVisible(!isSettingsVisible)}
                className="text-indigo-300 text-xs hover:underline focus:outline-none"
              >
                {isSettingsVisible
                  ? "Ukryj instrukcje przeglądarek"
                  : "Jak zmienić ustawienia w przeglądarce?"}
              </button>
            </div>
          </div>

          <div className="flex space-x-3 flex-shrink-0 mt-2 md:mt-0">
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-semibold bg-sky-600 rounded hover:bg-sky-700 transition mt-8"
            >
              Akceptuję
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-semibold border border-gray-600 rounded text-gray-400 hover:text-white transition mt-8"
            >
              Odrzuć
            </button>
          </div>
        </div>

        {/* Szczegóły typów cookies */}
        {isDetailsVisible && (
          <div className="w-full p-3 bg-gray-700 rounded text-xs mb-4">
            <p className="mb-2 font-bold">Rodzaje plików cookies:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold">Niezbędne:</span> do
                prawidłowego działania strony (np. podstawowe ustawienia).
              </li>
              <li>
                <span className="font-semibold">Analityczne:</span> do zbierania
                danych statystycznych o ruchu (np. liczba odwiedzin), wyłącznie
                za Twoją zgodą.
              </li>
              <li>
                <span className="font-semibold">Preferencyjne:</span> do
                zapamiętywania Twoich wyborów (np. decyzja o cookies).
              </li>
            </ul>
          </div>
        )}

        {/* Instrukcje przeglądarek */}
        {isSettingsVisible && (
          <div className="w-full p-4 bg-gray-700 rounded text-xs">
            <h4 className="font-bold text-sm mb-2">
              Instrukcje zarządzania plikami cookies w przeglądarkach:
            </h4>
            <p className="mb-2">
              Możesz zablokować lub ograniczyć pliki cookies, zmieniając
              ustawienia w swojej przeglądarce internetowej:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sky-300">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/pl/kb/usuwanie-ciasteczek-w-przegladarce-firefox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Apple Safari
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
