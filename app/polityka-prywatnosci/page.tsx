"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  const currentDate = new Date().toLocaleDateString("pl-PL");

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">
          Polityka prywatności
        </h1>

        <p className="text-sm text-gray-400 mb-12">
          Ostatnia aktualizacja: {currentDate}
        </p>

        {/* SEKCJA 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            1. Administrator danych
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Administratorem danych osobowych jest:
            <br />
            <span className="text-white font-semibold">
              Robert S. (osoba prywatna)
            </span>
            <br />
            kontakt:{" "}
            <a
              href="mailto:kontakt@robisolutionsit.com"
              className="text-cyan-300 underline underline-offset-2"
            >
              kontakt@robisolutionsit.com
            </a>
            .
          </p>
        </section>

        {/* SEKCJA 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            2. Dane przetwarzane podczas kontaktu
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Jeśli skorzystasz z formularza kontaktowego, mogą być przetwarzane:
          </p>
          <ul className="list-disc ml-6 text-gray-300 mt-2 space-y-1">
            <li>imię lub pseudonim,</li>
            <li>adres e-mail,</li>
            <li>treść wiadomości przesłanej przez formularz.</li>
          </ul>
        </section>

        {/* SEKCJA 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            3. Cel przetwarzania danych
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Dane przetwarzane są wyłącznie w celu udzielenia odpowiedzi na
            wysłaną wiadomość lub kontakt związany ze współpracą.
          </p>
        </section>

        {/* SEKCJA 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            4. Podstawa prawna przetwarzania
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Przetwarzanie danych odbywa się na podstawie:
            <br />
            <span className="text-white font-semibold">
              art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes
              administratora,
            </span>{" "}
            którym jest odpowiedź na kontakt zainicjowany przez użytkownika.
          </p>
        </section>

        {/* SEKCJA 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            5. Czas przechowywania danych
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Dane z formularza przechowywane są przez okres niezbędny do
            zakończenia korespondencji, a następnie mogą być przechowywane do{" "}
            <span className="text-white font-semibold">12 miesięcy</span> w
            archiwum poczty e-mail.
          </p>
        </section>

        {/* SEKCJA 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            6. Odbiorcy danych
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Dane mogą być przekazywane wyłącznie podmiotom zapewniającym obsługę
            techniczną:
          </p>
          <ul className="list-disc ml-6 text-gray-300 mt-2 space-y-1">
            <li>Hostinger – hosting VPS,</li>
            <li>Zoho Mail – obsługa poczty e-mail.</li>
          </ul>
          <p className="text-gray-300 mt-2">
            Dane nie są przekazywane podmiotom trzecim ani wykorzystywane do
            celów marketingowych.
          </p>
        </section>

        {/* SEKCJA 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            7. Twoje prawa (RODO)
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Użytkownik ma prawo do:
          </p>
          <ul className="list-disc ml-6 text-gray-300 mt-2 space-y-1">
            <li>dostępu do swoich danych,</li>
            <li>sprostowania danych,</li>
            <li>usunięcia danych,</li>
            <li>ograniczenia przetwarzania,</li>
            <li>wniesienia sprzeciwu,</li>
            <li>przenoszenia danych.</li>
          </ul>
          <p className="text-gray-300 mt-3">
            Aby skorzystać z praw, skontaktuj się:
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

        {/* SEKCJA 8 – Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            8. Pliki cookie (Cookies)
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Strona wykorzystuje pliki cookie w celach:
          </p>
          <ul className="list-disc ml-6 text-gray-300 mt-2 space-y-1">
            <li>niezbędnych – zapewniają poprawne działanie strony,</li>
            <li>analitycznych – tylko jeśli użytkownik wyrazi na nie zgodę,</li>
            <li>preferencji użytkownika – zapamiętywanie ustawień.</li>
          </ul>
          <p className="text-gray-300 mt-3">
            Szczegółowe informacje o typach plików cookie znajdują się w
            wyświetlanym banerze CookieConsent.
          </p>
        </section>

        {/* SEKCJA 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            9. Jak wyłączyć pliki cookie?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Użytkownik może zmienić ustawienia swojej przeglądarki i zablokować
            pliki cookie. Instrukcje znajdują się w banerze cookie pod linkiem
            „Jak zmienić ustawienia w przeglądarce?”.
          </p>
        </section>

        {/* SEKCJA 10 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
            10. Kontakt w sprawach prywatności
          </h2>
          <p className="text-gray-300 leading-relaxed">
            W sprawach dotyczących przetwarzania danych osobowych możesz
            kontaktować się:
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

export default PrivacyPolicyPage;
