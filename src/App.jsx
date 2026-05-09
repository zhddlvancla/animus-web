import React, { useEffect, useMemo, useRef, useState } from 'react';
import historyData from './data/history.json';
import BootSequence from './components/BootSequence.jsx';
import Header from './components/Header.jsx';
import FilterPanel, { ERAS } from './components/FilterPanel.jsx';
import Timeline from './components/Timeline.jsx';
import DetailPanel from './components/DetailPanel.jsx';
import DataStream from './components/DataStream.jsx';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [era, setEra] = useState('ALL');
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const searchRef = useRef(null);

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    return historyData.filter(ev => {
      if (era !== 'ALL' && ev.era !== era) return false;
      if (regions.length > 0 && !ev.region.some(r => regions.includes(r))) return false;
      if (categories.length > 0 && !categories.includes(ev.category)) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const blob = [
          ev.titleKo, ev.titleEn, ev.yearDisplay, ev.overview,
          ...(ev.keyFigures || []),
          ...(ev.significance || [])
        ].join(' ').toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [era, regions, categories, search]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key.toLowerCase() === 'f' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      const numKey = parseInt(e.key, 10);
      if (numKey >= 1 && numKey <= 6 && document.activeElement?.tagName !== 'INPUT') {
        const target = ERAS[numKey - 1];
        if (target) setEra(target.key);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!booted) return (
    <>
      <div className="hex-bg" />
      <BootSequence onDone={() => setBooted(true)} />
    </>
  );

  return (
    <div className="scanlines">
      <div className="hex-bg" />
      <DataStream side="left" />
      <DataStream side="right" />
      <div className="app">
        <Header />
        <div className={`main-grid ${selected ? '' : 'no-detail'}`}>
          <FilterPanel
            era={era} setEra={setEra}
            regions={regions} toggleRegion={r => toggle(regions, setRegions, r)}
            categories={categories} toggleCategory={c => toggle(categories, setCategories, c)}
            search={search} setSearch={setSearch}
            searchRef={searchRef}
          />
          <Timeline
            events={filtered}
            selected={selected}
            onSelect={setSelected}
          />
          {selected && (
            <DetailPanel
              event={selected}
              allEvents={historyData}
              onClose={() => setSelected(null)}
              onSelect={setSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}
