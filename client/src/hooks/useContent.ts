import { useEffect, useState } from 'react';
import type { Content, Lang } from '../types';

// Seçilen dile göre içeriği Node.js API'sinden çeker: GET /api/content?lang=tr
export function useContent(lang: Lang) {
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false; // dil hızlı değişirse eski cevabı yok say

    fetch(`/api/content?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error('İçerik alınamadı');
        return res.json() as Promise<Content>;
      })
      .then((data) => {
        if (!cancelled) {
          setContent(data);
          setError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return { content, error };
}
