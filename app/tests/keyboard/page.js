"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaKeyboard, FaSyncAlt } from "react-icons/fa";

/* ================== UKŁAD KLAWISZY (KEY MAPS) ================== */

const F_ROW_MAIN = [
  "Escape",
  "",
  "F1",
  "F2",
  "F3",
  "F4",
  "",
  "F5",
  "F6",
  "F7",
  "F8",
  "",
  "F9",
  "F10",
  "F11",
  "F12",
];
const F_ROW_NAV = ["PrintScreen", "ScrollLock", "Pause"];
const MAIN_ROWS = [
  [
    "Backquote",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Backspace",
  ],
  [
    "Tab",
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
    "Backslash",
  ],
  [
    "CapsLock",
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Enter",
  ],
  [
    "ShiftLeft",
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
    "ShiftRight",
  ],
  [
    "ControlLeft",
    "MetaLeft",
    "AltLeft",
    "Space",
    "AltRight",
    "MetaRight",
    "ControlRight",
  ],
];
const NAV_ROWS = [
  ["Insert", "Home", "PageUp"],
  ["Delete", "End", "PageDown"],
];
const ARROW_ROWS = [
  ["", "ArrowUp", ""],
  ["ArrowLeft", "ArrowDown", "ArrowRight"],
];

const NUMPAD_KEYS = [
  { key: "NumLock", row: 1, col: 1 },
  { key: "NumpadDivide", row: 1, col: 2 },
  { key: "NumpadMultiply", row: 1, col: 3 },
  { key: "NumpadSubtract", row: 1, col: 4 },
  { key: "Numpad7", row: 2, col: 1 },
  { key: "Numpad8", row: 2, col: 2 },
  { key: "Numpad9", row: 2, col: 3 },
  { key: "NumpadAdd", row: 2, col: 4, rowSpan: 2 },
  { key: "Numpad4", row: 3, col: 1 },
  { key: "Numpad5", row: 3, col: 2 },
  { key: "Numpad6", row: 3, col: 3 },
  { key: "Numpad1", row: 4, col: 1 },
  { key: "Numpad2", row: 4, col: 2 },
  { key: "Numpad3", row: 4, col: 3 },
  { key: "NumpadEnter", row: 4, col: 4, rowSpan: 2 },
  { key: "Numpad0", row: 5, col: 1, colSpan: 2 },
  { key: "NumpadDecimal", row: 5, col: 3 },
];

/* ================== LABELKI i NORMALIZACJA ZDARZEŃ ================== */
const PRIMARY_LABELS = {
  Escape: "ESC",
  Backquote: "`",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  Tab: "Tab",
  CapsLock: "Caps",
  ShiftLeft: "Shift",
  ShiftRight: "Shift",
  ControlLeft: "Ctrl",
  ControlRight: "Ctrl",
  AltLeft: "Alt",
  AltRight: "Alt",
  MetaLeft: "⊞",
  MetaRight: "⊞",
  Space: "",
  KeyQ: "Q",
  KeyW: "W",
  KeyE: "E",
  KeyR: "R",
  KeyT: "T",
  KeyY: "Y",
  KeyU: "U",
  KeyI: "I",
  KeyO: "O",
  KeyP: "P",
  KeyA: "A",
  KeyS: "S",
  KeyD: "D",
  KeyF: "F",
  KeyG: "G",
  KeyH: "H",
  KeyJ: "J",
  KeyK: "K",
  KeyL: "L",
  KeyZ: "Z",
  KeyX: "X",
  KeyC: "C",
  KeyV: "V",
  KeyB: "B",
  KeyN: "N",
  KeyM: "M",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Insert: "Insert",
  Delete: "Delete",
  Home: "Home",
  End: "End",
  PageUp: "PgUp",
  PageDown: "PgDn",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  Backspace: "Backspace",
  Enter: "Enter",
  PrintScreen: "Prt Sc",
  ScrollLock: "Scr Lk",
  Pause: "Pause",
  NumLock: "NumLock",
  NumpadDivide: "/",
  NumpadMultiply: "×",
  NumpadSubtract: "−",
  NumpadAdd: "+",
  NumpadEnter: "Enter",
  NumpadDecimal: ".",
  Numpad0: "0",
  Numpad1: "1",
  Numpad2: "2",
  Numpad3: "3",
  Numpad4: "4",
  Numpad5: "5",
  Numpad6: "6",
  Numpad7: "7",
  Numpad8: "8",
  Numpad9: "9",
};
const SECONDARY_LABELS = {
  Backquote: "~",
  Digit1: "!",
  Digit2: "@",
  Digit3: "#",
  Digit4: "$",
  Digit5: "%",
  Digit6: "^",
  Digit7: "&",
  Digit8: "*",
  Digit9: "(",
  Digit0: ")",
  Minus: "_",
  Equal: "+",
  BracketLeft: "{",
  BracketRight: "}",
  Backslash: "|",
  Semicolon: ":",
  Quote: '"',
  Comma: "<",
  Period: ">",
  Slash: "?",
};

const getKeyCode = (event) => {
  if (event.code && event.code.startsWith("Numpad")) {
    return event.code;
  }
  switch (event.key) {
    case " ":
      return "Space";
    case "Enter":
      return "Enter";
    case "Tab":
      return "Tab";
    case "Escape":
      return "Escape";
    case "Backspace":
      return "Backspace";
    case "CapsLock":
      return "CapsLock";
    case "Shift":
      return event.code;
    case "Control":
      return event.code;
    case "Alt":
      return event.code;
    case "Meta":
      return event.code || "MetaLeft";
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
      return event.key;
    default:
      return event.code || event.key;
  }
};

/* ================== KOMPONENT ================== */

const KeyboardTest = () => {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [testedKeys, setTestedKeys] = useState(new Set());

  const handleKeyDown = useCallback((event) => {
    const keyCode = getKeyCode(event);

    // Lista klawiszy, dla których chcemy zablokować domyślną funkcję przeglądarki/systemu
    const keysToPreventDefault = [
      "Space",
      "Escape",
      "Tab",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      "Insert",
      "Delete",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "PrintScreen",
      "ScrollLock",
      "Pause",
    ];

    if (keysToPreventDefault.includes(keyCode) || keyCode.startsWith("F")) {
      // Blokujemy klawisz, jeśli jest na liście lub zaczyna się na F (klawisze funkcyjne)
      event.preventDefault();
    }

    // Dodawanie do przetestowanych
    setTestedKeys((prev) => {
      if (!prev.has(keyCode)) {
        const next = new Set(prev);
        next.add(keyCode);
        return next;
      }
      return prev;
    });

    // Dodanie do aktywnych
    setActiveKeys((prev) => {
      if (!prev.has(keyCode)) {
        const next = new Set(prev);
        next.add(keyCode);
        return next;
      }
      return prev;
    });
  }, []);

  const handleKeyUp = useCallback((event) => {
    const keyCode = getKeyCode(event);
    // Usunięcie z aktywnych, ale pozostaje w testedKeys
    setActiveKeys((prev) => {
      if (prev.has(keyCode)) {
        const next = new Set(prev);
        next.delete(keyCode);
        return next;
      }
      return prev;
    });
  }, []);

  const resetTest = () => {
    setTestedKeys(new Set());
    setActiveKeys(new Set());
  };

  useEffect(() => {
    // Upewniamy się, że cały dokument nasłuchuje zdarzeń
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  /* ================== STYL KLAWISZY (KEY STYLE) ================== */

  const getKeyStyle = (code) => {
    if (!code) return "w-1 sm:w-3 mx-0.5 sm:mx-1 my-1";

    const isDown = activeKeys.has(code);
    const isTested = testedKeys.has(code);

    // Domyslny styl (NIE PRZETESTOWANY) - CIEMNOSZARY
    let color =
      "bg-gray-800 border-gray-700 text-gray-200 shadow-sm shadow-[0_2px_0_rgba(0,0,0,0.3)]";

    // Styl dla klawisza przetestowanego (PO ZWOLNIENIU) - ZIELONY GLOW
    if (isTested) {
      color =
        "bg-green-600 border-green-700 text-white shadow-lg shadow-green-500/50";
    }

    // Styl dla klawisza aktywnego (WCIŚNIĘTY) - NIEBIESKI GLOW
    if (isDown) {
      color =
        "bg-indigo-600 border-indigo-700 text-white shadow-lg shadow-indigo-500/50 scale-[0.97] translate-y-0.5";
    }

    const radius = "rounded-md";
    const heightClass = "h-8 sm:h-9 lg:h-10";
    const baseMargin = "mx-0.5 my-1";

    const base =
      "flex items-center justify-center border text-[0.7rem] sm:text-[0.78rem] lg:text-[0.85rem] font-medium select-none transition-all duration-100 ease-out";

    let width = "px-1 min-w-[1.6rem] sm:px-2.5 sm:min-w-[1.9rem]";
    let margin = baseMargin;
    let height = heightClass;

    if (code.startsWith("Numpad")) {
      margin = "mx-0.5";
      width = "w-full";
      height = "h-full";
    }
    // Ustawienia szerokości klawiszy MAIN (bez zmian)
    else if (code === "Backspace") {
      width = "px-2 min-w-[3.5rem] sm:px-4 lg:min-w-[4.3rem]";
    } else if (code === "Tab" || code === "CapsLock") {
      width = "px-2 min-w-[3rem] sm:px-3.5 lg:min-w-[3.6rem]";
    } else if (code === "ShiftLeft") {
      width = "px-2 min-w-[3.5rem] sm:px-4 lg:min-w-[4.1rem]";
    } else if (code === "Space") {
      width = "flex-1 px-3 min-w-[6rem] sm:px-5 lg:min-w-[8rem]";
    } else if (
      code === "ControlLeft" ||
      code === "ControlRight" ||
      code === "AltLeft" ||
      code === "AltRight" ||
      code === "MetaLeft" ||
      code === "MetaRight"
    ) {
      width = "px-2 min-w-[2.2rem] sm:px-3 lg:min-w-[2.6rem]";
    } else if (/^F\d{1,2}$/.test(code)) {
      width = "px-2 min-w-[2rem] sm:px-2.5 lg:min-w-[2.6rem]";
    } else if (code === "Backslash") {
      width = "flex-1 px-2 min-w-[3.5rem] sm:px-4 lg:min-w-[4.8rem]";
    } else if (code === "Enter") {
      width = "flex-1 px-3 min-w-[4rem] sm:px-5 lg:min-w-[5.2rem]";
    } else if (code === "ShiftRight") {
      width = "flex-1 px-3 min-w-[4rem] sm:px-5 lg:min-w-[5.2rem]";
    }

    return `${base} ${radius} ${height} ${color} ${width} ${margin}`;
  };

  const renderKeyContent = (code) => {
    if (!code) return null;

    // Specjalna obsługa dla NumLock w 2 liniach
    if (code === "NumLock") {
      return (
        <div className="flex flex-col items-center justify-center h-full leading-none text-[0.7rem] lg:text-[0.8rem] py-1">
          <span>Num</span>
          <span>Lock</span>
        </div>
      );
    }

    const primary = PRIMARY_LABELS[code] ?? code;
    const secondary = SECONDARY_LABELS[code];

    if (!secondary) {
      return <span>{primary}</span>;
    }

    return (
      <div className="w-full h-full flex flex-col justify-between items-start px-1 pt-1 pb-1.5 leading-tight">
        <span className="text-[0.5rem] sm:text-[0.6rem] text-cyan-400">
          {secondary}
        </span>
        <span className="self-center text-[0.7rem] sm:text-[0.78rem] text-gray-200">
          {primary}
        </span>
      </div>
    );
  };

  /* ================== RENDER ================== */

  return (
    <div className="flex flex-col items-center justify-start p-4 lg:p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-xl sm:text-3xl font-bold mb-2 text-cyan-400 flex items-center space-x-2">
        <FaKeyboard /> <span>Test Klawiatury</span>
      </h1>
      <p className="text-gray-400 mb-6 text-center max-w-2xl text-sm lg:text-base">
        Naciśnij dowolny klawisz na swojej fizycznej klawiaturze.
      </p>

      {/* Panel kontrolny */}
      <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-6">
        <button
          type="button"
          onClick={resetTest}
          className="flex items-center space-x-2 px-4 lg:px-5 py-2 rounded-md bg-indigo-600 text-white font-semibold text-sm lg:text-base shadow-sm hover:bg-indigo-700 active:scale-95 transition"
        >
          <FaSyncAlt /> <span>Zresetuj test</span>
        </button>
      </div>

      <hr className="w-full max-w-lg border-gray-700 my-4" />

      {/* === KOMUNIKAT DLA MAŁYCH EKRANÓW (UKRYTY od lg: - 1024px) === */}
      <div className="lg:hidden bg-yellow-900 border border-yellow-700 p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto my-8">
        <p className="text-lg font-bold text-yellow-400 mb-2">
          ⚠️ Brak podglądu klawiatury ⚠️
        </p>
        <p className="text-sm text-yellow-200">
          Graficzna reprezentacja klawiatury jest dostępna tylko na urządzeniach
          o szerokości ekranu **powyżej 1024 pikseli** (duże laptopy/desktop).
          <br />
          Test klawiatury jest nadal aktywny!
        </p>
      </div>

      {/* Klawiatura Główna (WIDOCZNA od lg: - 1024px) */}
      <div className="hidden lg:block bg-gray-800 border border-gray-700 rounded-lg lg:rounded-3xl shadow-xl px-2 py-3 lg:px-4 lg:py-5 w-full max-w-[1100px] mx-auto">
        <div className="flex flex-col w-full text-[0.8rem]">
          {/* F-klawisze */}
          <div className="flex items-start mb-2 lg:mb-4">
            <div className="flex flex-wrap justify-start">
              {F_ROW_MAIN.map((code, i) =>
                code ? (
                  <div key={`f-${code}-${i}`} className={getKeyStyle(code)}>
                    {renderKeyContent(code)}
                  </div>
                ) : (
                  <div
                    key={`fsp-${i}`}
                    className="w-1 lg:w-4 mx-0.5 lg:mx-1 my-1"
                  />
                )
              )}
            </div>

            <div className="flex ml-2 lg:ml-6 flex-wrap justify-end">
              {F_ROW_NAV.map((code, i) => (
                <div key={`fnav-${code}-${i}`} className={getKeyStyle(code)}>
                  {renderKeyContent(code)}
                </div>
              ))}
            </div>
          </div>

          {/* Trzy bloki: main / nav+strzałki / numpad */}
          <div className="flex items-end">
            {/* GŁÓWNY BLOK */}
            <div className="flex flex-col flex-[3]">
              {MAIN_ROWS.map((row, r) => (
                <div key={`main-row-${r}`} className="flex w-full">
                  {row.map((code, i) => (
                    <div
                      key={`main-${r}-${code}-${i}`}
                      className={getKeyStyle(code)}
                    >
                      {renderKeyContent(code)}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* NAV + STRZAŁKI (Widoczny od lg:) */}
            <div className="hidden lg:flex flex-col flex-[1.2] ml-4 lg:ml-8">
              {NAV_ROWS.map((row, r) => (
                <div key={`nav-row-${r}`} className="flex w-full">
                  {row.map((code, i) => (
                    <div
                      key={`nav-${r}-${code}-${i}`}
                      className={getKeyStyle(code)}
                    >
                      {renderKeyContent(code)}
                    </div>
                  ))}
                </div>
              ))}

              <div className="mt-auto h-2 lg:h-6" />

              {/* Strzałki */}
              {ARROW_ROWS.map((row, r) => (
                <div key={`arrow-row-${r}`} className="flex justify-center">
                  {row.map((code, i) =>
                    code ? (
                      <div
                        key={`arrow-${r}-${code}-${i}`}
                        className={getKeyStyle(code)}
                      >
                        {renderKeyContent(code)}
                      </div>
                    ) : (
                      <div
                        key={`arrow-spacer-${r}-${i}`}
                        className="w-8 mx-0.5"
                      />
                    )
                  )}
                </div>
              ))}
            </div>

            {/* NUMPAD (Widoczny od lg:) */}
            <div className="hidden lg:grid ml-4 lg:ml-8 grid-cols-4 grid-rows-5 gap-2 max-w-fit">
              {NUMPAD_KEYS.map(({ key, row, col, rowSpan, colSpan }) => {
                let spanClasses = "";
                let containerClasses = "flex";

                if (rowSpan === 2) {
                  spanClasses += " row-span-2";
                  containerClasses += " h-full";
                }
                if (colSpan === 2) spanClasses += " col-span-2";

                return (
                  <div
                    key={`num-${key}-${row}-${col}`}
                    className={`${containerClasses} ${spanClasses}`}
                    style={{
                      gridRowStart: row,
                      gridColumnStart: col,
                    }}
                  >
                    <div className={getKeyStyle(key)}>
                      {renderKeyContent(key)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dolne "przyciski myszki" - ZMNIEJSZONE */}
          <div className="mt-5 flex justify-center gap-3 px-8">
            <div className="flex-1 h-8 rounded-full border border-gray-700 bg-gray-700/50" />{" "}
            {/* Zmieniono h-10 na h-8 */}
            <div className="w-12 h-8 rounded-full border border-gray-700 bg-gray-700/50" />{" "}
            {/* Zmieniono w-16 na w-12 i h-10 na h-8 */}
            <div className="flex-1 h-8 rounded-full border border-gray-700 bg-gray-700/50" />{" "}
            {/* Zmieniono h-10 na h-8 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardTest;
