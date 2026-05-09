import React, { forwardRef } from 'react';

const SearchBar = forwardRef(function SearchBar({ value, onChange }, ref) {
  return (
    <div className="search-bar" role="search">
      <span className="prompt">&gt; SEARCH:</span>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="EVENT / 인물 / 연도..."
        aria-label="검색"
      />
    </div>
  );
});

export default SearchBar;
