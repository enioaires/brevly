import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const smoothScrollTo = useCallback((targetId: string, duration: number = 1500) => {
    const target = document.getElementById(targetId);
    if (!target) {
      console.warn(`Elemento com ID "${targetId}" não encontrado`);
      return;
    }

    // Calcular posição correta do elemento
    const rect = target.getBoundingClientRect();
    const targetPosition = window.pageYOffset + rect.top - 80; // 80px para compensar a navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    console.log(`Navegando para ${targetId}:`, {
      targetPosition,
      startPosition,
      distance,
      elementTop: rect.top
    });

    let startTime: number | null = null;

    // Função de easing para movimento mais natural
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = easeInOutCubic(progress);
      const currentPosition = startPosition + distance * ease;

      window.scrollTo(0, currentPosition);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  return { smoothScrollTo };
};