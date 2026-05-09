import React, { useMemo } from 'react';

function genStream(rows = 240) {
  const chars = '0123456789ABCDEF';
  const lines = [];
  for (let i = 0; i < rows; i++) {
    let s = '';
    for (let j = 0; j < 2; j++) s += chars[Math.floor(Math.random() * chars.length)];
    lines.push(s);
  }
  return lines.join('\n');
}

export default function DataStream({ side = 'left' }) {
  const stream = useMemo(() => {
    const block = genStream(160);
    return block + '\n' + block;
  }, []);
  return (
    <div className={`data-stream ${side}`} aria-hidden="true">
      <div className="data-stream-inner">{stream}</div>
    </div>
  );
}
