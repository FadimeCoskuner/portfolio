import { useEffect } from 'react';

// Fare konumunu <html> üzerine CSS değişkeni olarak yazar:
// --mx / --my (piksel, ışık efekti için) ve --px / --py (-1..1 arası, hafif paralaks için)
export function usePointer() {
  useEffect(() => {
    // Dokunmatik ekranlarda ya da hareket azaltma tercihinde gerek yok
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
        root.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
        root.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);
}
