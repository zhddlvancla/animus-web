import { useEffect, useState } from 'react';

export default function useTypewriter(text, speed = 14, delay = 0) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut('');
    setDone(false);
    if (!text) { setDone(true); return; }
    let i = 0;
    let cancelled = false;
    let timer;

    const start = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          return;
        }
        timer = setTimeout(tick, speed + Math.random() * 8);
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, delay]);

  return [out, done];
}
