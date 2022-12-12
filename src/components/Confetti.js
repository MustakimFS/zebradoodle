import { useEffect } from 'react';
import confetti from 'canvas-confetti';

// Imperative one-shot. Mount with active=true to fire a celebration burst.
function Confetti({ active }) {
  useEffect(() => {
    if (!active) return;
    const end = Date.now() + 900;
    const colors = ['#538d4e', '#b59f3b', '#85c0f9', '#f87171', '#fde68a'];
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
  }, [active]);
  return null;
}

export default Confetti;
