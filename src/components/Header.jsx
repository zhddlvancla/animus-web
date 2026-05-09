import React, { useEffect, useState } from 'react';

export default function Header() {
  const [mem, setMem] = useState(94.7);
  const [sync, setSync] = useState(100);

  useEffect(() => {
    const id = setInterval(() => {
      setMem(94 + Math.random() * 4);
      setSync(98 + Math.random() * 2);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header" role="banner">
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div className="header-logo glitch" aria-label="ANIMUS HISTORICA">
          ANIMUS HISTORICA
        </div>
        <div className="header-sub">
          세계사 데이터베이스 — HISTORICAL MEMORY SYNCHRONIZATION SYSTEM
        </div>
      </div>
      <div className="header-stats">
        <span>MEM: <b>{mem.toFixed(1)}%</b></span>
        <span>SYNC: <b>{sync.toFixed(1)}%</b></span>
        <span>ANIMUS <b>v4.7.3</b></span>
      </div>
    </header>
  );
}
