import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WORDS, WORDS_LEN } from "./words";
import type { GuessedStatusType } from "./types";
import { VALID_WORDS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickWord() {
  const idx = Math.floor(Math.random() * WORDS_LEN);
  return WORDS[idx];
}

export function checkAnswer(
  input: string,
  word: string,
): Array<GuessedStatusType> {
  input = input.toLowerCase();
  const wordLetters = word.split("");
  const inputletters = input.split("");
  const letterFreq = new Map();
  const inputFreq = new Map();

  for (let i = 0; i < word.length; i++) {
    if (word[i] !== input[i]) {
      letterFreq.set(word[i], (letterFreq.get(word[i]) || 0) + 1);
      inputFreq.set(input[i], (inputFreq.get(input[i]) || 0) + 1);
    }
  }

  return inputletters.map((v, i) => {
    if (wordLetters[i] === v) {
      return "correct";
    }
    if (letterFreq.get(v)) {
      letterFreq.set(v, letterFreq.get(v) - 1);
      return "misplaced";
    }
    return "wrong";
  });
}

export function isValidWord(word: string) {
  if (word.length < 5) return false;
  return VALID_WORDS.has(word.toLowerCase());
}

export const throttle = (callback: (...args: any[]) => void, delay: number) => {
  let isWaiting = false;

  return (...args: any[]) => {
    if (isWaiting) {
      return;
    }

    callback(...args);
    isWaiting = true;

    setTimeout(() => {
      isWaiting = false;
    }, delay);
  };
};
