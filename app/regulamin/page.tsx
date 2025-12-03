"use client";

import React from "react";

const TermsPage = () => {
  const currentDate = new Date().toLocaleDateString("pl-PL");

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-cyan-400">
          Regulamin świadczenia usług
        </h1>

        <p className="text-sm text-gray-400 mb-12">
          Ostatnia aktualizacja: {currentDate}
        </p>

        {/* 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            1. Informacje ogólne
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Niniejszy regulamin określa zasady świadczenia usług informatycznych
            i serwisowych przez osobę prywatną — Roberta S. — kontakt:
            <br />
            📩{" "}
            <a
              href="mailto:kontakt@robisolutionsit.com"
              className="text-cyan-300 underline"
            >
              kontakt@robisolutionsit.com
            </a>
          </p>
        </section>

        {/* 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            2. Zakres świadczonych usług
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Usługi obejmują w szczególności:
          </p>
          <ul className="list-disc ml-6 text-gray-300 mt-2 space-y-1">
            <li>serwis sprzętu komputerowego i elektroniki,</li>
            <li>diagnozę i naprawę problemów software/hardware,</li>
            <li>tworzenie stron internetowych,</li>
            <li>konfigurację systemów Windows / Linux,</li>
            <li>wsparcie IT i konsultacje techniczne.</li>
          </ul>
        </section>

        {/* 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            3. Charakter usług
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Usługi mają charakter nieformalny i nie są świadczone w ramach
            działalności gospodarczej. Każde zlecenie realizowane jest jako umowa
            cywilnoprawna między zlecającym a wykonawcą.
          </p>
        </section>

        {/* 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            4. Odpowiedzialność
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Wykonawca zobowiązuje się do realizacji usług z należytą starannością.
            Zlecający jest zobowiązany do:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-300">
            <li>
              przekazania sprzętu w stanie umożliwiającym diagnozę lub naprawę,
            </li>
            <li>
              poinformowania o wcześniejszych próbach samodzielnej naprawy,
            </li>
            <li>
              wykonania kopii zapasowej danych — wykonawca nie odpowiada za dane
              pozostawione na urządzeniu.
            </li>
          </ul>

          <p className="text-gray-300 mt-3">
            W przypadku usług web-dev:
            <br />
            wykonawca nie ponosi odpowiedzialności za szkody wynikające z
            nieprawidłowego korzystania ze strony lub zmian wprowadzonych przez
            osoby trzecie.
          </p>
        </section>

        {/* 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            5. Wynagrodzenie
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Wynagrodzenie ustalane jest indywidualnie dla każdego zlecenia
            przed rozpoczęciem prac. Ceny mogą zależeć od poziomu trudności,
            czasu realizacji oraz ewentualnych kosztów dodatkowych.
          </p>
        </section>

        {/* 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            6. Kontakt
          </h2>
          <p className="text-gray-300 leading-relaxed">
            W sprawach związanych ze zleceniem można się kontaktować:
            <br />
            📩{" "}
            <a
              href="mailto:kontakt@robisolutionsit.com"
              className="text-cyan-300 underline"
            >
              kontakt@robisolutionsit.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsPage;
