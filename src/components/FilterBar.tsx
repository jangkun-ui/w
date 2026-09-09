import React from 'react';
import { Search, X, SlidersHorizontal, ArrowDownAZ, Star, Calendar, Sparkles } from 'lucide-react';
import { GENRES } from '../data/movies';
import { SortOption } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedGenre: string;
  onSelectGenre: (g: string) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onSelectGenre,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  return (
    <div id="filter-bar-container" className="space-y-3 mb-6">
      {/* Top row: Search input + Sort dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            id="movie-search-input"
            type="text"
            placeholder="Search movies, directors, genres, or keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl bg-slate-900/90 border border-slate-800/90 pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-amber-500/80 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
          <span id="results-count-label" className="font-medium text-slate-400">
            {totalResults} {totalResults === 1 ? 'Movie' : 'Movies'}
          </span>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              id="sort-movies-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-slate-200 font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900 text-white">
                Featured
              </option>
              <option value="rating" className="bg-slate-900 text-white">
                Top Rated
              </option>
              <option value="year" className="bg-slate-900 text-white">
                Release Year
              </option>
              <option value="title" className="bg-slate-900 text-white">
                Title (A-Z)
              </option>
              <option value="duration" className="bg-slate-900 text-white">
                Runtime
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Genre Chips */}
      <div
        id="genre-chips-scroll"
        className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
      >
        {GENRES.map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <button
              key={genre}
              id={`genre-filter-${genre.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              type="button"
              onClick={() => onSelectGenre(genre)}
              className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};
