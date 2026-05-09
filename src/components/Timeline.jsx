import React, { useMemo } from 'react';
import TimelineNode from './TimelineNode.jsx';
import EraMarker from './EraMarker.jsx';

const ERA_ORDER = ['고대', '중세', '근세', '근대', '현대'];

function centuryLabel(year) {
  if (year < 0) {
    const c = Math.ceil(Math.abs(year) / 100);
    return `${c}세기 BCE / ${c}00s BCE`;
  }
  const c = Math.floor((year - 1) / 100) + 1;
  const startCentury = (c - 1) * 100;
  return `${c}세기 / ${startCentury === 0 ? '1' : startCentury}00s CE`;
}

function centuryKey(year) {
  if (year < 0) return `BCE-${Math.ceil(Math.abs(year) / 100)}`;
  return `CE-${Math.floor((year - 1) / 100) + 1}`;
}

export default function Timeline({ events, selected, onSelect }) {
  const grouped = useMemo(() => {
    const sorted = [...events].sort((a, b) => a.year - b.year);
    const out = [];
    let lastKey = null;
    sorted.forEach(ev => {
      const k = centuryKey(ev.year);
      if (k !== lastKey) {
        out.push({ type: 'era', key: k, century: centuryLabel(ev.year), era: ev.era });
        lastKey = k;
      }
      out.push({ type: 'event', event: ev });
    });
    return out;
  }, [events]);

  const eraAnchors = useMemo(() => {
    const anchors = {};
    events.forEach(ev => {
      if (!anchors[ev.era]) anchors[ev.era] = `era-anchor-${ev.era}`;
    });
    return anchors;
  }, [events]);

  const scrollToEra = era => {
    const sorted = [...events].sort((a, b) => a.year - b.year);
    const first = sorted.find(e => e.era === era);
    if (!first) return;
    const el = document.getElementById(`event-${first.id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="timeline-wrap" role="main">
      <nav className="timeline-quicknav" aria-label="시대 빠른 이동">
        <span style={{ fontSize: 11, color: 'var(--animus-text-dim)', marginRight: 6, alignSelf: 'center', letterSpacing: '0.2em' }}>
          // JUMP TO ERA →
        </span>
        {ERA_ORDER.map(era => (
          eraAnchors[era] && (
            <button
              key={era}
              className="quicknav-btn"
              onClick={() => scrollToEra(era)}
              aria-label={`${era} 시대로 이동`}
            >
              {era}
            </button>
          )
        ))}
      </nav>

      {events.length === 0 ? (
        <div className="no-results brackets" style={{ marginTop: 80 }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="err">// NO MATCHING MEMORIES FOUND</div>
          <div>FILTER 조건을 조정하거나 SEARCH 쿼리를 변경하세요.</div>
        </div>
      ) : (
        <div className="timeline">
          {grouped.map((row, idx) => {
            if (row.type === 'era') {
              return <EraMarker key={row.key} century={row.century} era={row.era} />;
            }
            const eventIdx = grouped.slice(0, idx).filter(r => r.type === 'event').length;
            const side = eventIdx % 2 === 0 ? 'left' : 'right';
            return (
              <div key={row.event.id} id={`event-${row.event.id}`}>
                <TimelineNode
                  event={row.event}
                  side={side}
                  onSelect={onSelect}
                  selected={selected?.id === row.event.id}
                />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
