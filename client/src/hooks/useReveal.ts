import { useEffect } from 'react';

// Sayfa kaydırıldıkça .reveal sınıflı elemanlar ekrana girince .is-visible eklenir (CSS ile belirir).
// "deps" değişince (ör. dil değişti, yeni elemanlar geldi) tekrar taranır.
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-visible)');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // bir kez belirmesi yeterli
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
