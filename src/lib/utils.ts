import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WORDS, WORDS_LEN } from "./words";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickWord() {
  const idx = Math.floor(Math.random() * WORDS_LEN);
  return WORDS[idx];
}
