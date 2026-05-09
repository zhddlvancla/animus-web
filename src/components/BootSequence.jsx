import React, { useEffect, useState } from 'react';

const LINES = [
  { text: '> INITIALIZING ANIMUS v4.7.3...', delay: 200, status: 'ok' },
  { text: '> LOADING BIOMETRIC INTERFACE...........[OK]', delay: 500, status: 'ok' },
  { text: '> CALIBRATING NEURAL HANDSHAKE..........[OK]', delay: 350, status: 'ok' },
  { text: '> ESTABLISHING SECURE LINK TO ARCHIVE...[OK]', delay: 350, status: 'ok' },
  { text: '> SYNCHRONIZING HISTORICAL DATA STREAMS...', delay: 400, status: 'warn' },
  { text: '> DECRYPTING MEMORY SEQUENCES...........[OK]', delay: 500, status: 'ok' },
  { text: '> CROSS-REFERENCING TEMPORAL INDEX......[OK]', delay: 350, status: 'ok' },
  { text: '> WARNING: GENETIC MEMORY INTEGRITY 94.7%', delay: 300, status: 'warn' },
  { text: '> BYPASSING DESYNC PROTOCOL.............[OK]', delay: 400, status: 'ok' },
  { text: '> ACCESS GRANTED — WELCOME, SUBJECT.', delay: 500, status: 'ok' }
];

export default function BootSequence({ onDone }) {
  const [shown, setShown] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    let total = 0;
    LINES.forEach((line, idx) => {
      total += line.delay;
      setTimeout(() => {
        if (!mounted) return;
        setShown(s => [...s, idx]);
        setProgress(((idx + 1) / LINES.length) * 100);
      }, total);
    });
    const finishAt = total + 600;
    const t = setTimeout(() => mounted && onDone(), finishAt);
    return () => { mounted = false; clearTimeout(t); };
  }, [onDone]);

  return (
    <div className="boot">
      <div className="boot-logo glitch">ANIMUS</div>
      <div style={{ color: 'var(--animus-text-dim)', fontSize: 11, letterSpacing: '0.4em' }}>
        HISTORICAL MEMORY SYNCHRONIZATION SYSTEM
      </div>
      <div className="boot-bar">
        <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="boot-lines">
        {shown.map(idx => {
          const l = LINES[idx];
          const cls = l.status === 'ok' ? 'ok' : l.status === 'warn' ? 'warn' : 'err';
          const isLast = idx === shown[shown.length - 1] && shown.length < LINES.length;
          return (
            <span key={idx} className={`boot-line ${isLast ? 'cursor-blink' : ''}`}>
              <span className={cls}>{l.text}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
