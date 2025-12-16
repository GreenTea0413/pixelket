'use client';

import { useLanguageStore } from '@/store/useLanguageStore';
import type { Locale } from '@/locales';

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguageStore();

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`
            px-2 py-1 text-xs font-pixel transition-colors
            ${
              locale === lang.code
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }
          `}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
