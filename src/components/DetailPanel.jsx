import React from 'react';
import useTypewriter from '../hooks/useTypewriter.js';

const CAT_CLASS = {
  '정치/전쟁': 'tag-war',
  '문화/예술': 'tag-culture',
  '경제/사회': 'tag-economy',
  '과학/기술': 'tag-science',
  '인물': 'tag-figure'
};

function TwParagraph({ text, speed = 8, delay = 0 }) {
  const [out, done] = useTypewriter(text, speed, delay);
  return <p className={`tw ${done ? 'done' : ''}`}>{out}</p>;
}

export default function DetailPanel({ event, onClose, allEvents, onSelect }) {
  if (!event) return null;

  const related = (event.relatedEvents || [])
    .map(id => allEvents.find(e => e.id === id))
    .filter(Boolean);

  return (
    <aside className="detail-panel brackets" role="complementary" aria-label="역사 기록 상세">
      <span className="br-bl" /><span className="br-br" />
      <button className="detail-close" onClick={onClose} aria-label="기록 닫기">
        [✕ CLOSE]
      </button>

      <div className="detail-header glitch">// ANIMUS RECORD — ACCESSING MEMORY SEQUENCE</div>
      <div className="detail-divider" />
      <div className="detail-meta">
        <span>[EVENT ID: {event.id}]</span>
        <span>[SYNC: {event.syncRating}]</span>
      </div>

      <div className="detail-title">{event.titleKo}</div>
      <div className="detail-title-en">{event.titleEn}</div>

      <div className="detail-section">
        <h4>// 기본 정보 — BASIC INFO</h4>
        <div className="kv-row"><span className="kv-key">YEAR</span><span className="kv-val">{event.yearDisplay}</span></div>
        <div className="kv-row"><span className="kv-key">ERA</span><span className="kv-val">{event.era}</span></div>
        <div className="kv-row">
          <span className="kv-key">REGION</span>
          <span className="kv-val">
            {event.region.map(r => <span key={r} className="tag tag-region" style={{ marginRight: 4 }}>{r}</span>)}
          </span>
        </div>
        <div className="kv-row">
          <span className="kv-key">CATEGORY</span>
          <span className="kv-val">
            <span className={`tag ${CAT_CLASS[event.category]}`}>{event.category}</span>
          </span>
        </div>
        {event.keyFigures && event.keyFigures.length > 0 && (
          <div className="kv-row">
            <span className="kv-key">FIGURES</span>
            <span className="kv-val">{event.keyFigures.join(' · ')}</span>
          </div>
        )}
      </div>

      <div className="detail-section">
        <h4>// 개요 — OVERVIEW</h4>
        <TwParagraph text={event.overview} speed={6} delay={120} />
      </div>

      <div className="detail-section">
        <h4>// 역사적 의의 — HISTORICAL SIGNIFICANCE</h4>
        <ul>
          {event.significance.map((s, i) => (
            <SigItem key={i} text={s} delay={300 + i * 200} />
          ))}
        </ul>
      </div>

      {related.length > 0 && (
        <div className="detail-section">
          <h4>// 관련 사건 — RELATED EVENTS</h4>
          {related.map(r => (
            <button
              key={r.id}
              className="related-link"
              onClick={() => onSelect(r)}
              aria-label={`${r.titleKo}로 이동`}
            >
              ▸ {r.titleKo} ({r.yearDisplay})
            </button>
          ))}
        </div>
      )}

      <div className="source-label">
        // DATA SOURCE: HISTORICAL ARCHIVE — RECONSTRUCTED MEMORY //
      </div>
    </aside>
  );
}

function SigItem({ text, delay }) {
  const [out, done] = useTypewriter(text, 6, delay);
  return <li className={`tw ${done ? 'done' : ''}`}>{out}</li>;
}
