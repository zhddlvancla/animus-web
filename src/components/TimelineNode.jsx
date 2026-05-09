import React, { useEffect, useRef, useState } from 'react';

const CAT_CLASS = {
  '정치/전쟁': 'tag-war',
  '문화/예술': 'tag-culture',
  '경제/사회': 'tag-economy',
  '과학/기술': 'tag-science',
  '인물': 'tag-figure'
};

export default function TimelineNode({ event, side, onSelect, selected }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`node-row ${side} ${inView ? 'in-view' : ''}`}>
      <span className="node-dot" aria-hidden="true" />
      <div
        className={`node-card brackets ${selected ? 'selected' : ''}`}
        onClick={() => onSelect(event)}
        role="button"
        tabIndex={0}
        aria-label={`${event.titleKo} - ${event.yearDisplay} 기록 열기`}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(event)}
      >
        <span className="br-bl" /><span className="br-br" />
        <div className="nc-tags">
          <span className={`tag ${CAT_CLASS[event.category] || 'tag-science'}`}>{event.category}</span>
          {event.region.slice(0, 2).map(r => (
            <span key={r} className="tag tag-region">{r}</span>
          ))}
        </div>
        <div className="nc-divider" />
        <div className="nc-year">{event.yearDisplay}</div>
        <div className="nc-title-ko">{event.titleKo}</div>
        <div className="nc-title-en">({event.titleEn})</div>
        <div className="nc-cta">▶ 클릭하여 기록 열기</div>
      </div>
    </div>
  );
}
