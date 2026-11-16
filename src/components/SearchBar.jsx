import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar-wrap">
      <Search size={20} className="search-icon-left" />
      <input
        type="text"
        className="search-input"
        placeholder="Search movies by title, actors, or keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search movies"
      />
      {value && (
        <button
          className="search-clear-btn"
          onClick={onClear}
          aria-label="Clear search"
          title="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
