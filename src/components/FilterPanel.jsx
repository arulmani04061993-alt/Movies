import React from 'react';
import { ChevronDown, RotateCcw, X } from 'lucide-react';
import { GENRES, SORT_OPTIONS } from '../data/movies';

export default function FilterPanel({
  selectedGenre,
  onGenreChange,
  selectedYear,
  onYearChange,
  selectedRating,
  onRatingChange,
  selectedSort,
  onSortChange,
  onResetFilters,
  hasActiveFilters
}) {
  const YEARS = [
    'All Years',
    '2024',
    '2023',
    '2022',
    '2019',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2010',
    '2009',
    '2008',
    '2006',
    '2001',
    '2000',
    '1999',
    '1995',
    '1994',
    '1991',
    '1990',
    '1972'
  ];
  const RATINGS = [
    { label: 'All Ratings', value: 0 },
    { label: '★ 9.0+ Masterpieces', value: 9.0 },
    { label: '★ 8.5+ Highly Acclaimed', value: 8.5 },
    { label: '★ 8.0+ Great Cinema', value: 8.0 },
    { label: '★ 7.5+ Good Watch', value: 7.5 }
  ];

  return (
    <div className="filters-row">
      <div className="filters-group">
        {/* Genre Dropdown */}
        <div className="custom-select-wrap">
          <select
            className="custom-select"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            aria-label="Filter by genre"
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g === 'All' ? 'All Genres' : g}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="select-chevron" />
        </div>

        {/* Year Dropdown */}
        <div className="custom-select-wrap">
          <select
            className="custom-select"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            aria-label="Filter by release year"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="select-chevron" />
        </div>

        {/* Rating Dropdown */}
        <div className="custom-select-wrap">
          <select
            className="custom-select"
            value={selectedRating}
            onChange={(e) => onRatingChange(Number(e.target.value))}
            aria-label="Filter by minimum rating"
          >
            {RATINGS.map((r) => (
              <option key={r.label} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="select-chevron" />
        </div>

        {/* Sort Dropdown */}
        <div className="custom-select-wrap">
          <select
            className="custom-select"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort movies"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="select-chevron" />
        </div>
      </div>

      {/* Reset Filters CTA */}
      {hasActiveFilters && (
        <button
          className="btn-reset-filters"
          onClick={onResetFilters}
          title="Reset all filters to default"
        >
          <RotateCcw size={15} />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
