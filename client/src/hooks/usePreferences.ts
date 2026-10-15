import { useEffect, useState } from 'react';
import type { Lang } from '../types';

// localStorage bazı tarayıcı ayarlarında hata verebilir, o yüzden try/catch içinde
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* kaydedilemezse sorun değil */
  }
}

// Dil tercihi: kayıtlı değilse tarayıcı dili Türkçe ise tr, değilse en
export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = readStorage('lang');
    if (saved === 'tr' || saved === 'en') return saved;
    return navigator.language.startsWith('tr') ? 'tr' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    writeStorage('lang', lang);
  }, [lang]);

  return [lang, setLang] as const;
}
