import { useEffect, useState } from 'react';

export default function useGlitch(intervalMs = 4500) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 220);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return glitch;
}
