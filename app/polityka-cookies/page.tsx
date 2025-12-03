"use client";

import React from "react";

const CookiesPolicyPage = () => {
  const currentDate = new Date().toLocaleDateString("pl-PL");

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">
          Polityka Cookies
        </h1>

        <p className="text-sm text-gray-400 mb-12">
          Ostatnia aktualizacja: {currentDate}
        </p>

        {/* 1. Czym są cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            1. Czym są pliki cookies?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Pliki cookies to niewielkie pliki tekstowe zapisywane na Twoim
            urządzeniu (komputerze, smartfonie, tablecie) podczas korzystania z
            serwisów internetowych. Cookies pozwalają m.in. na prawidłowe
            działanie strony, zapamiętywanie Twoich ustawień oraz analizę ruchu
            na stronie.
          </p>
        </section>

        {/* 2. Typy cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            2. Jakie pliki cookies wykorzystujemy?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            W serwisie robisolutionsit.com mogą być wykorzystywane następujące
            kategorie plików cookies:
          </p>
          <ul className="list-disc ml-6 mt-3 text-gray-300 space-y-2">
            <li>
              <span className="text-white font-semibold">Niezbędne:</span> służą
              do zapewnienia poprawnego działania strony, utrzymania sesji
              użytkownika oraz zapamiętywania podstawowych ustawień.
            </li>
            <li>
              <span className="text-white font-semibold">Analityczne:</span>{" "}
              mogą służyć do zbierania anonimowych informacji statystycznych o
              sposobie korzystania ze strony (np. liczba odwiedzin, typ
              urządzenia), tylko jeśli użytkownik wyrazi na nie zgodę.
            </li>
            <li>
              <span className="text-white font-semibold">Preferencyjne:</span>{" "}
              pozwalają zapamiętać Twoje wybory, np. decyzję o akceptacji lub
              odrzuceniu cookies.
            </li>
            <li>
              <span className="text-white font-semibold">Marketingowe:</span>{" "}
              wykorzystywane do wyświetlania spersonalizowanych treści – obecnie
              na stronie nie są aktywnie używane.
            </li>
          </ul>
        </section>

        {/* 3. Mechanizm zgody */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            3. Mechanizm zgody na cookies
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Przy pierwszej wizycie na stronie wyświetlany jest baner dotyczący
            plików cookies (CookieConsent). Umożliwia on:
          </p>
          <ul className="list-disc ml-6 mt-3 text-gray-300 space-y-2">
            <li>akceptację wszystkich plików cookies,</li>
            <li>odrzucenie cookies nieniezbędnych,</li>
            <li>zapoznanie się z typami używanych plików cookies,</li>
            <li>przejście do instrukcji zmiany ustawień w przeglądarce.</li>
          </ul>
          <p className="text-gray-300 mt-3">
            W każdej chwili możesz również ponownie otworzyć ustawienia cookies,
            korzystając z odnośnika „Ustawienia cookies” dostępnego w stopce
            strony.
          </p>
        </section>

        {/* 4. Jak wyłączyć cookies w przeglądarce */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            4. Jak zarządzać i wyłączać pliki cookies w przeglądarce?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Większość przeglądarek internetowych pozwala na blokowanie lub
            ograniczanie plików cookies, a także na ich usuwanie. Poniżej
            znajdują się odnośniki do oficjalnych instrukcji:
          </p>
          <ul className="list-disc ml-6 mt-3 text-sky-300 space-y-2 text-sm">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Google Chrome – zarządzanie cookies
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/pl/kb/usuwanie-ciasteczek-w-przegladarce-firefox"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Mozilla Firefox – usuwanie cookies
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Microsoft Edge – zarządzanie cookies
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Apple Safari – zarządzanie cookies
              </a>
            </li>
            <li>
              <a
                href="https://help.opera.com/en/latest/web-preferences/#cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Opera – ustawienia cookies
              </a>
            </li>
          </ul>
          <p className="text-gray-300 mt-3 text-sm">
            Ograniczenie stosowania plików cookies może wpłynąć na niektóre
            funkcje dostępne na stronie, ale nie powinno uniemożliwiać
            podstawowego korzystania z serwisu.
          </p>
        </section>

        {/* 5. Cyberbezpieczeństwo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            5. Cyberbezpieczeństwo i ochrona danych
          </h2>
          <p className="text-gray-300 leading-relaxed">
            W ramach funkcjonowania serwisu dokładam starań, aby dane
            użytkowników były przetwarzane w sposób bezpieczny i zgodny z
            obowiązującymi przepisami.
          </p>
          <ul className="list-disc ml-6 mt-3 text-gray-300 space-y-2">
            <li>
              połączenie z witryną jest szyfrowane protokołem{" "}
              <span className="text-white font-semibold">HTTPS (SSL/TLS)</span>,
            </li>
            <li>
              stosowane są mechanizmy zabezpieczające serwer przed atakami typu
              brute-force i skanowaniem,
            </li>
            <li>
              dane przesyłane przez formularz kontaktowy są chronione podczas
              transmisji i nie są zapisywane w bazie danych serwisu,
            </li>
            <li>
              wykorzystywane są usługi renomowanych dostawców hostingu i poczty,
              takich jak Hostinger oraz Zoho Mail.
            </li>
          </ul>
          <p className="text-gray-300 mt-3 text-sm">
            Pomimo stosowania odpowiednich środków technicznych i
            organizacyjnych, korzystanie z internetu zawsze wiąże się z pewnym
            ryzykiem. Użytkownikom zaleca się stosowanie aktualnych
            przeglądarek, oprogramowania antywirusowego oraz silnych haseł.
          </p>
        </section>

        {/* 6. Kontakt */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            6. Kontakt w sprawach dotyczących cookies
          </h2>
          <p className="text-gray-300 leading-relaxed">
            W sprawach dotyczących plików cookies lub prywatności możesz
            skontaktować się:
            <br />
            📩{" "}
            <a
              href="mailto:kontakt@robisolutionsit.com"
              className="text-cyan-300 underline underline-offset-2"
            >
              kontakt@robisolutionsit.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;
