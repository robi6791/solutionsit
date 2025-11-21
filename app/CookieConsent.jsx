// CookieConsent.jsx
"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const COOKIE_STORAGE_KEY = "cookies_status"; // Zmieniono klucz na bardziej ogólny
const COOKIE_STATUS_ACCEPTED = "accepted";
const COOKIE_STATUS_DECLINED = "declined";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // Nowy stan dla instrukcji

  useEffect(() => {
    // Sprawdza, czy użytkownik już podjął decyzję
    const status = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!status) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, COOKIE_STATUS_ACCEPTED);
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Zapamiętuje decyzję "odrzucono", aby nie pytać ponownie
    localStorage.setItem(COOKIE_STORAGE_KEY, COOKIE_STATUS_DECLINED);
    // Tutaj należy dodać logikę blokowania skryptów śledzących
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 flex items-end justify-center">
      {/* Kontener główny komunikatu, teraz na dole ekranu */}
      <div className="w-full max-w-4xl p-4 bg-gray-800 text-white shadow-2xl transition-all duration-500 ease-in-out">
        {/* Sekcja 1: Treść i przyciski */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-700 pb-4 mb-4">
          {/* Treść */}
          <div className="mb-4 md:mb-0 md:pr-4">
            <p className="text-sm">
              Używamy plików cookie w celu zapewnienia prawidłowego działania
              serwisu i analizy ruchu. Korzystanie z witryny oznacza zgodę na
              ich zapis lub odczyt.
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
              {/* Nowy link do instrukcji przeglądarki */}
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

          {/* Przyciski akcji */}
          <div className="flex space-x-3 flex-shrink-0">
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-semibold bg-sky-600 rounded hover:bg-sky-700 transition"
            >
              Akceptuję
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-semibold border border-gray-600 rounded text-gray-400 hover:text-white transition"
            >
              Odrzuć
            </button>
          </div>
        </div>

        {/* Sekcja 2: Szczegóły (rozwijane) */}
        {isDetailsVisible && (
          <div className="w-full p-3 bg-gray-700 rounded text-xs mb-4">
            <p className="mb-2 font-bold">
              Rodzaje plików cookies, których możemy używać:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                **Niezbędne:** Do prawidłowego działania strony (np. sesja
                logowania).
              </li>
              <li>
                **Analityczne:** Do zbierania danych o ruchu (np. Google
                Analytics).
              </li>
              <li>
                **Marketingowe:** Do wyświetlania spersonalizowanych reklam.
              </li>
            </ul>
          </div>
        )}

        {/* Sekcja 3: Ustawienia przeglądarki (NOWA) */}
        {isSettingsVisible && (
          <div className="w-full p-4 bg-gray-700 rounded text-xs">
            <h4 className="font-bold text-sm mb-2">
              Instrukcje zarządzania plikami cookie w przeglądarkach:
            </h4>
            <p className="mb-2">
              Możesz zablokować lub ograniczyć pliki cookie, zmieniając
              ustawienia w swojej przeglądarce.
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
