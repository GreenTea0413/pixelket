import { ko } from './ko';
import { en } from './en';
import { ja } from './ja';
import { zh } from './zh';

export const locales = {
  ko,
  en,
  ja,
  zh,
} as const;

export type Locale = keyof typeof locales;
export type Translation = typeof ko;
