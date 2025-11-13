import { WORDS } from "./words";

export const DISPLAY_KEYS = [
  [
    { text: "Q", code: "KeyQ" },
    { text: "W", code: "KeyW" },
    { text: "E", code: "KeyE" },
    { text: "R", code: "KeyR" },
    { text: "T", code: "KeyT" },
    { text: "Y", code: "KeyY" },
    { text: "U", code: "KeyU" },
    { text: "I", code: "KeyI" },
    { text: "O", code: "KeyO" },
    { text: "P", code: "KeyP" },
  ],
  [
    { text: "A", code: "KeyA" },
    { text: "S", code: "KeyS" },
    { text: "D", code: "KeyD" },
    { text: "F", code: "KeyF" },
    { text: "G", code: "KeyG" },
    { text: "H", code: "KeyH" },
    { text: "J", code: "KeyJ" },
    { text: "K", code: "KeyK" },
    { text: "L", code: "KeyL" },
  ],
  [
    { text: "← Back", code: "Backspace" },
    { text: "Z", code: "KeyZ" },
    { text: "X", code: "KeyX" },
    { text: "C", code: "KeyC" },
    { text: "V", code: "KeyV" },
    { text: "B", code: "KeyB" },
    { text: "N", code: "KeyN" },
    { text: "M", code: "KeyM" },
    { text: "ENTER", code: "Enter" },
  ],
];

export const VALID_WORDS = new Set(WORDS);

export const ATTEMPT_AMOUNT = 6;

export const WORDLE_LENGTH = { "5": 5 };

export const BASE_ANIMATION_DELAY = 150;
