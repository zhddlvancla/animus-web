import React from 'react';
import SearchBar from './SearchBar.jsx';

const ERAS = [
  { key: 'ALL', label: '전체 (ALL)' },
  { key: '고대', label: '고대 (Ancient)' },
  { key: '중세', label: '중세 (Medieval)' },
  { key: '근세', label: '근세 (Early Modern)' },
  { key: '근대', label: '근대 (Modern)' },
  { key: '현대', label: '현대 (Contemporary)' }
];

const REGIONS = ['한국', '동아시아', '유럽', '중동/이슬람', '아메리카', '세계'];

const CATEGORIES = [
  { key: '정치/전쟁', cls: 'tag-war' },
  { key: '문화/예술', cls: 'tag-culture' },
  { key: '경제/사회', cls: 'tag-economy' },
  { key: '과학/기술', cls: 'tag-science' },
  { key: '인물', cls: 'tag-figure' }
];

export default function FilterPanel({
  era, setEra,
  regions, toggleRegion,
  categories, toggleCategory,
  search, setSearch,
  searchRef
}) {
  return (
    <aside className="filter-panel" aria-label="필터">
      <div className="filter-title flicker">// FILTER PROTOCOL</div>

      <div className="filter-section brackets">
        <span className="br-bl" /><span className="br-br" />
        <h3>// ERA</h3>
        {ERAS.map(e => (
          <div
            key={e.key}
            className={`filter-option ${era === e.key ? 'active' : ''}`}
            onClick={() => setEra(e.key)}
            role="radio"
            aria-checked={era === e.key}
            tabIndex={0}
            onKeyDown={ev => (ev.key === 'Enter' || ev.key === ' ') && setEra(e.key)}
          >
            <span className={`filter-box radio ${era === e.key ? 'checked' : ''}`} />
            <span>{e.label}</span>
          </div>
        ))}
      </div>

      <div className="filter-section brackets">
        <span className="br-bl" /><span className="br-br" />
        <h3>// REGION</h3>
        {REGIONS.map(r => (
          <div
            key={r}
            className={`filter-option ${regions.includes(r) ? 'active' : ''}`}
            onClick={() => toggleRegion(r)}
            role="checkbox"
            aria-checked={regions.includes(r)}
            tabIndex={0}
            onKeyDown={ev => (ev.key === 'Enter' || ev.key === ' ') && toggleRegion(r)}
          >
            <span className={`filter-box ${regions.includes(r) ? 'checked' : ''}`} />
            <span>{r}</span>
          </div>
        ))}
      </div>

      <div className="filter-section brackets">
        <span className="br-bl" /><span className="br-br" />
        <h3>// EVENT TYPE</h3>
        {CATEGORIES.map(c => (
          <div
            key={c.key}
            className={`filter-option ${categories.includes(c.key) ? 'active' : ''}`}
            onClick={() => toggleCategory(c.key)}
            role="checkbox"
            aria-checked={categories.includes(c.key)}
            tabIndex={0}
            onKeyDown={ev => (ev.key === 'Enter' || ev.key === ' ') && toggleCategory(c.key)}
          >
            <span className={`filter-box ${categories.includes(c.key) ? 'checked' : ''}`} />
            <span className={`tag ${c.cls}`}>{c.key}</span>
          </div>
        ))}
      </div>

      <div className="filter-section brackets">
        <span className="br-bl" /><span className="br-br" />
        <h3>// SEARCH QUERY</h3>
        <SearchBar value={search} onChange={setSearch} ref={searchRef} />
      </div>
    </aside>
  );
}

export { ERAS, CATEGORIES };
