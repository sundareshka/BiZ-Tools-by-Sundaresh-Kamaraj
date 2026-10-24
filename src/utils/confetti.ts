import confetti from 'canvas-confetti';

/**
 * Triggers a vibrant, multi-stage confetti celebration burst when a user completes a simulator
 * @param origin Optional {x, y} coordinate (0 to 1 normalized) where the confetti originates
 */
export function triggerCompletionConfetti(origin?: { x: number; y: number }): void {
  if (typeof window === 'undefined') return;

  const defaultOrigin = origin || { x: 0.5, y: 0.65 };

  // 1. Initial high-energy center burst with executive palette
  confetti({
    particleCount: 70,
    spread: 65,
    origin: defaultOrigin,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6', '#14b8a6'],
    ticks: 200,
    gravity: 1.1,
    scalar: 1.05,
    disableForReducedMotion: true,
  });

  // 2. Delayed secondary celebration side flairs
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 60,
      origin: { x: Math.max(0.05, defaultOrigin.x - 0.25), y: defaultOrigin.y + 0.05 },
      colors: ['#10b981', '#3b82f6', '#f59e0b'],
      ticks: 180,
      gravity: 1.0,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 35,
      angle: 120,
      spread: 60,
      origin: { x: Math.min(0.95, defaultOrigin.x + 0.25), y: defaultOrigin.y + 0.05 },
      colors: ['#6366f1', '#ec4899', '#8b5cf6'],
      ticks: 180,
      gravity: 1.0,
      disableForReducedMotion: true,
    });
  }, 120);
}
