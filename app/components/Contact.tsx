"use client";

import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Schema walidacji (front, spójna z backendem)
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .max(20, "Imię może mieć maksymalnie 20 znaków."),
  email: z
    .string()
    .min(5, "Podaj adres e-mail.")
    .email("Podaj poprawny adres e-mail."),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków.")
    .max(500, "Wiadomość może mieć maksymalnie 500 znaków."),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState<string | null>(null);

  const nameInputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  React.useEffect(() => {
    const openContact = () => setIsContactModalOpen(true);

    window.addEventListener("open-contact-modal", openContact);

    return () => {
      window.removeEventListener("open-contact-modal", openContact);
    };
  }, []);

  // 🔹 Fokus na polu "Imię" po otwarciu modala + reset komunikatów
  React.useEffect(() => {
    if (isContactModalOpen) {
      setSubmitError(null);
      setSubmitSuccess(null);

      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  }, [isContactModalOpen]);

  // 🔹 Zamknięcie modala klawiszem Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };

    if (isContactModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isContactModalOpen]);

  // 🔹 licznik znaków dla wiadomości (bazuje na watch)
  const watchedMessage = watch("message", "");
  const messageLength = watchedMessage?.length ?? 0;

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json: { ok?: boolean; error?: string } = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Błąd przy wysyłce wiadomości.");
      }

      setSubmitSuccess("Wiadomość została wysłana. Dziękuję za kontakt!");
      reset();

      setTimeout(() => {
        setIsContactModalOpen(false);
        setSubmitSuccess(null);
      }, 1500);
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Coś poszło nie tak. Spróbuj ponownie za chwilę.");
      }
    }
  };

  // kolory
  const phoneColor = "text-indigo-400";
  const emailColor = "text-sky-400";
  const whatsappColor = "text-green-400";
  const linkColor =
    "text-xs sm:text-sm text-gray-400 hover:text-sky-400 transition";
  const menuHeaderColor = "text-cyan-400";

  return (
    <>
      {/* GŁÓWNA SEKCJA KONTAKTU */}
      <section
        className="pt-16 pb-1 max-w-[1200px] mx-auto px-4"
        id="contact"
        aria-label="Kontakt – usługi IT, programowanie i serwis"
      >
        {/* 1. NAGŁÓWEK */}
        <div className="text-left mb-4 md:mb-6">
          <h2
            className="text-3xl lg:text-5xl font-extrabold mb-4 
                       bg-gradient-to-r from-sky-400 to-indigo-500 
                       text-transparent bg-clip-text 
                       opacity-90 
                       text-stroke"
          >
            Skontaktuj się
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl">
            Jeśli potrzebujesz wsparcia IT, naprawy sprzętu, pomocy przy
            aplikacji webowej lub administracji serwerami – odezwij się.
            Odpowiadam na wiadomości tak szybko, jak to możliwe.
          </p>
        </div>

        {/* 2. DANE KONTAKTOWE */}
        <div className="flex flex-col items-start space-y-6 text-white max-w-lg mb-12 border-b border-white/10 pb-12">
          <h3 className="text-lg font-semibold text-white mb-2">
            Bezpośredni kontakt
          </h3>

          {/* Telefon */}
          <div className="flex items-center space-x-4">
            <AiOutlinePhone size={28} className={phoneColor} />
            <div>
              <p className="text-md font-medium text-white/50 mb-1">Telefon</p>
              <a
                href="tel:+48502316393"
                className={`text-lg font-semibold ${phoneColor} hover:underline`}
              >
                +48 502 316 393
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center space-x-4">
            <FaWhatsapp size={28} className={whatsappColor} />
            <div>
              <p className="text-md font-medium text-white/50 mb-1">WhatsApp</p>
              <a
                href="https://wa.me/48502316393"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-lg font-semibold ${whatsappColor} hover:underline`}
              >
                Napisz na WhatsApp
              </a>
            </div>
          </div>

          {/* Email – klikalny, otwiera popup */}
          <div className="flex items-center space-x-4">
            <AiOutlineMail size={28} className={emailColor} />
            <div>
              <p className="text-md font-medium text-white/50 mb-1">
                Adres e-mail
              </p>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className={`text-lg font-semibold ${emailColor} underline decoration-2 underline-offset-4 hover:underline hover:decoration-3 hover:cursor-pointer focus:outline-none`}
              >
                kontakt@robisolutionsit.com
              </button>
            </div>
          </div>
        </div>

        {/* 3. BLOK LINKÓW (5 kolumn) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-white">
          {/* KOLUMNA 1: TESTY ON-LINE */}
          <div className="text-sm">
            <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
              Testy On-line
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/tests/keyboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Klawiatura
                </a>
              </li>
              <li>
                <a
                  href="/tests/mic-speaker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Mikrofon i Głośniki
                </a>
              </li>
              <li>
                <a
                  href="/tests/internet-speed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Test Prędkości Internetu
                </a>
              </li>
              <li>
                <a
                  href="/tests/lcd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Wyświetlacz LCD/Monitor
                </a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 2: KALKULATORY */}
          <div className="text-sm">
            <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
              Kalkulatory
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/calculators/voltage-divider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Dzielnik napięcia
                </a>
              </li>
              <li>
                <a
                  href="/calculators/subnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Kalkulator Subnettingu
                </a>
              </li>
              <li>
                <a
                  href="/calculators/resistor-color-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Kody Paskowe Rezystorów
                </a>
              </li>
              <li>
                <a
                  href="/calculators/smd-resistor-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Kody Rezystorów SMD
                </a>
              </li>
              <li>
                <a
                  href="/calculators/base-converter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Konwersja Liczb
                </a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 3: SYSTEMY OPERACYJNE */}
          <div className="text-sm">
            <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
              Systemy Operacyjne
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://learn.microsoft.com/en-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Microsoft Learn (Win/AD)
                </a>
              </li>
              <li>
                <a
                  href="https://www.tldp.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Linux Documentation Project
                </a>
              </li>
              <li>
                <a
                  href="https://wiki.archlinux.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Arch Wiki (Konfiguracja OS)
                </a>
              </li>
              <li>
                <a
                  href="https://learn.microsoft.com/en-us/powershell/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  PowerShell Docs
                </a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 4: TRENDY IT */}
          <div className="text-sm">
            <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
              Trendy IT
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://news.ycombinator.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Hacker News (Tech News)
                </a>
              </li>
              <li>
                <a
                  href="https://www.cisa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  CISA (Cybersecurity Trends)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/trending"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  GitHub Trending Repos
                </a>
              </li>
              <li>
                <a
                  href="https://techcrunch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  TechCrunch / The Verge
                </a>
              </li>
              <li>
                <a
                  href="https://www.tomshardware.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Tom&apos;s Hardware (Recenzje)
                </a>
              </li>
              <li>
                <a
                  href="https://www.anandtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  AnandTech (Analiza Sprzętu)
                </a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 5: AI / AUTOMATYZACJA */}
          <div className="text-sm">
            <h3 className={`font-semibold mb-3 ${menuHeaderColor}`}>
              AI · Automatyzacja
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.tensorflow.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  TensorFlow (Deep Learning)
                </a>
              </li>
              <li>
                <a
                  href="https://pytorch.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  PyTorch (Biblioteka ML)
                </a>
              </li>
              <li>
                <a
                  href="https://automatetheboringstuff.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  Automatyzacja Pythonem
                </a>
              </li>
              <li>
                <a
                  href="https://platform.openai.com/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkColor}
                >
                  OpenAI Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* KONIEC BLOKU LINKÓW */}
      </section>

      {/* POPUP FORMULARZA */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            aria-describedby="contact-dialog-description"
            onClick={(e) => e.stopPropagation()}
          >
            {/* X */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white text-xl"
              aria-label="Zamknij formularz"
            >
              ×
            </button>

            <div className="px-6 pt-6 pb-5">
              <h3
                id="contact-dialog-title"
                className="text-xl font-semibold text-white mb-1"
              >
                Napisz wiadomość
              </h3>
              <p
                id="contact-dialog-description"
                className="text-sm text-gray-400 mb-6"
              >
                Wypełnij krótki formularz, a odezwę się tak szybko, jak to
                możliwe.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >
                {/* Imię */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-gray-400 mb-1.5"
                  >
                    Imię
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    {...register("name")}
                    ref={(e) => {
                      register("name").ref(e);
                      nameInputRef.current = e;
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="Twoje imię"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-gray-400 mb-1.5"
                  >
                    Adres e-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="np. twoj@mail.pl"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Wiadomość */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-gray-400 mb-1.5"
                  >
                    Wiadomość
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
                    placeholder="Opisz krótko, w czym mogę pomóc…"
                    maxLength={500}
                  />
                  {/* licznik znaków */}
                  <div className="text-right text-[11px] text-gray-400 mt-1">
                    {messageLength} / 500
                  </div>
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div aria-live="polite" className="min-h-[1.2rem]">
                  {submitError && (
                    <p className="text-xs text-red-400">{submitError}</p>
                  )}
                  {submitSuccess && (
                    <p className="text-xs text-emerald-400">{submitSuccess}</p>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg border border-slate-600 text-gray-300 hover:bg-slate-800/80 transition"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-indigo-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
