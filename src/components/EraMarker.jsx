import React from 'react';

export default function EraMarker({ century, era, id }) {
  return (
    <div className="era-marker glitch" id={id}>
      <div className="era-bar">
        <span className="era-label">[ {century} ]</span>
      </div>
      <div className="era-sub">{era} ERA — {eraEn(era)}</div>
    </div>
  );
}

function eraEn(era) {
  return {
    '고대': 'ANCIENT',
    '중세': 'MEDIEVAL',
    '근세': 'EARLY MODERN',
    '근대': 'MODERN',
    '현대': 'CONTEMPORARY'
  }[era] || '';
}
