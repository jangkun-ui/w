import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { MovieCard } from './components/MovieCard';
import { VideoPlayer } from './components/VideoPlayer';
import { TabCloakModal } from './components/TabCloakModal';
import { PanicOverlay } from './components/PanicOverlay';
import { AddStreamModal } from './components/AddStreamModal';
import { ContinueWatchingBar } from './components/ContinueWatchingBar';
import { JsonViewerModal } from './components/JsonViewerModal';
import { IframeCatalogModal } from './components/IframeCatalogModal';
import { INITIAL_MOVIES, loadMoviesFromJsonFiles } from './data/movies';
import { Movie, SortOption, CloakPreset } from './types';
import {
  getFavorites,
  toggleFavorite,
  getWatchProgress,
  saveWatchProgress,
  clearWatchProgress,
  getCustomMovies,
  saveCustomMovie,
  deleteCustomMovie,
  applyTabCloak,
  getActiveCloak,
  CLOAK_PRESETS,
} from './utils/storage';
import { Film, Shield, FileCode, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [loadedMovies, setLoadedMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [customMovies, setCustomMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);

  // Modals & Overlays
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [isAddStreamModalOpen, setIsAddStreamModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [jsonViewerMovie, setJsonViewerMovie] = useState<Movie | null>(null);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [isCinemaDimmed, setIsCinemaDimmed] = useState(false);
  const [activeCloakId, setActiveCloakId] = useState('default');
  const [activeCloakName, setActiveCloakName] = useState('Default');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Initialize client-side state and load from JSON files on mount
  useEffect(() => {
    setFavorites(getFavorites());
    setProgressMap(getWatchProgress());
    setCustomMovies(getCustomMovies());

    // Dynamically fetch and sync all movie iframe JSON files
    loadMoviesFromJsonFiles()
      .then((movies) => {
        if (movies && movies.length > 0) {
          setLoadedMovies(movies);
        }
      })
      .catch(() => {
        // Fallback to INITIAL_MOVIES
      });

    // Restore tab cloak if previously selected
    const savedCloak = getActiveCloak();
    if (savedCloak) {
      const preset = CLOAK_PRESETS.find((p) => p.id === savedCloak.id) || CLOAK_PRESETS[0];
      applyTabCloak(preset, savedCloak.customTitle, savedCloak.customIcon);
      setActiveCloakId(preset.id);
      setActiveCloakName(savedCloak.customTitle || preset.name);
    }
  }, []);

  // Global key listener for Panic mode (`~` or `Esc`)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsPanicActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Combine loaded movie JSONs + user custom streams
  const allMovies = useMemo(() => {
    return [...customMovies, ...loadedMovies];
  }, [customMovies, loadedMovies]);

  // Featured Hero movie
  const featuredMovie = useMemo(() => {
    return allMovies.find((m) => m.isFeatured) || allMovies[0];
  }, [allMovies]);

  // Filtered & Sorted Movie List
  const filteredMovies = useMemo(() => {
    let list = [...allMovies];

    // Watchlist filter toggle
    if (showFavoritesOnly || selectedGenre === 'Watchlist') {
      list = list.filter((m) => favorites.includes(m.id));
    } else if (selectedGenre === 'Custom Streams') {
      list = list.filter((m) => m.isCustom);
    } else if (selectedGenre !== 'All') {
      list = list.filter((m) => m.genres.includes(selectedGenre));
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.director.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.genres.some((g) => g.toLowerCase().includes(query)) ||
          (m.cast && m.cast.some((c) => c.toLowerCase().includes(query)))
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'year') {
        return b.year - a.year;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'duration') {
        return a.durationSeconds - b.durationSeconds;
      }
      // default: featured first, then rating
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    });

    return list;
  }, [allMovies, showFavoritesOnly, selectedGenre, searchQuery, sortBy, favorites]);

  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const handleSaveProgress = (currentTime: number, duration: number) => {
    if (!activeMovie) return;
    saveWatchProgress({
      movieId: activeMovie.id,
      currentTime,
      duration,
      lastWatched: Date.now(),
      completed: currentTime > duration - 15,
    });
    setProgressMap(getWatchProgress());
  };

  const handleClearProgress = (movieId: string) => {
    clearWatchProgress(movieId);
    setProgressMap(getWatchProgress());
  };

  const handleAddCustomMovie = (movie: Movie) => {
    const updated = saveCustomMovie(movie);
    setCustomMovies(updated);
    setActiveMovie(movie); // Immediately open player to stream
  };

  const handleDeleteCustomMovie = (id: string) => {
    const updated = deleteCustomMovie(id);
    setCustomMovies(updated);
  };

  const handleSelectCloak = (preset: CloakPreset, customTitle?: string, customIcon?: string) => {
    applyTabCloak(preset, customTitle, customIcon);
    setActiveCloakId(preset.id);
    setActiveCloakName(customTitle || preset.name);
    setIsCloakModalOpen(false);
  };

  return (
    <div
      id="app-root-wrapper"
      className={`min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 transition-colors ${
        isCinemaDimmed ? 'opacity-90' : 'opacity-100'
      }`}
    >
      {/* Panic Screen Overlay */}
      <PanicOverlay
        isOpen={isPanicActive}
        onExitPanic={() => setIsPanicActive(false)}
      />

      {/* Tab Cloak Modal */}
      <TabCloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
        activeCloakId={activeCloakId}
        onSelectCloak={handleSelectCloak}
      />

      {/* Add / Import Iframe JSON Modal */}
      <AddStreamModal
        isOpen={isAddStreamModalOpen}
        onClose={() => setIsAddStreamModalOpen(false)}
        onAddMovie={handleAddCustomMovie}
      />

      {/* Stored Iframe JSON Files Catalog Explorer */}
      <IframeCatalogModal
        movies={allMovies}
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        onPlayMovie={(movie) => setActiveMovie(movie)}
        onOpenAddModal={() => setIsAddStreamModalOpen(true)}
      />

      {/* Individual JSON Viewer Modal */}
      <JsonViewerModal
        movie={jsonViewerMovie}
        isOpen={!!jsonViewerMovie}
        onClose={() => setJsonViewerMovie(null)}
      />

      {/* Main Top Navigation */}
      <Navbar
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
        onOpenAddStreamModal={() => setIsAddStreamModalOpen(true)}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
        isCinemaDimmed={isCinemaDimmed}
        onToggleCinemaDimmed={() => setIsCinemaDimmed((prev) => !prev)}
        activeCloakName={activeCloakName}
      />

      {/* Active Video Player View */}
      {activeMovie && (
        <VideoPlayer
          movie={activeMovie}
          onClose={() => setActiveMovie(null)}
          initialTime={progressMap[activeMovie.id]?.currentTime || 0}
          onSaveProgress={handleSaveProgress}
          isFavorite={favorites.includes(activeMovie.id)}
          onToggleFavorite={() => handleToggleFavorite(activeMovie.id)}
        />
      )}

      {/* Main Catalog View */}
      <main id="main-catalog-content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Continue Watching Carousel */}
        <ContinueWatchingBar
          movies={allMovies}
          progressMap={progressMap}
          onPlay={(movie) => setActiveMovie(movie)}
          onClearProgress={handleClearProgress}
        />

        {/* Hero Premiere Banner (shown when not filtering by search or favorites) */}
        {!searchQuery && selectedGenre === 'All' && !showFavoritesOnly && featuredMovie && (
          <HeroBanner
            movie={featuredMovie}
            onPlay={(movie) => setActiveMovie(movie)}
            isFavorite={favorites.includes(featuredMovie.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Filter & Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenre={selectedGenre}
          onSelectGenre={(g) => {
            setSelectedGenre(g);
            if (g === 'Watchlist') setShowFavoritesOnly(true);
            else setShowFavoritesOnly(false);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredMovies.length}
        />

        {/* Storage Architecture Banner info chip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 px-4 py-2.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-amber-400" />
            <span className="text-slate-300">
              Each movie in this unblocked library is maintained as a separate iframe JSON file.
            </span>
          </div>
          <button
            id="explore-json-files-chip-btn"
            type="button"
            onClick={() => setIsCatalogModalOpen(true)}
            className="flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 hover:underline"
          >
            Explore all {allMovies.length} JSON files →
          </button>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div
            id="movies-grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlay={(m) => setActiveMovie(m)}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={handleToggleFavorite}
                progress={progressMap[movie.id]}
                onDeleteCustom={handleDeleteCustomMovie}
                onViewJson={(m) => setJsonViewerMovie(m)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div
            id="empty-results-state"
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center my-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
              <Film className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No movies found</h3>
            <p className="text-sm text-slate-400 max-w-sm mb-4">
              {showFavoritesOnly
                ? "You haven't added any movies to your watchlist yet. Click the bookmark icon on any movie to save it."
                : `No titles match "${searchQuery || selectedGenre}". Try searching another keyword or clearing filters.`}
            </p>
            <div className="flex gap-2">
              <button
                id="reset-filter-btn"
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('All');
                  setShowFavoritesOnly(false);
                }}
                className="rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 text-xs font-bold transition-colors"
              >
                Reset Filters
              </button>
              <button
                id="empty-add-stream-btn"
                type="button"
                onClick={() => setIsAddStreamModalOpen(true)}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-xs font-medium transition-colors"
              >
                + Add Custom Stream
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Cinema Footer */}
      <footer
        id="app-cinema-footer"
        className="mt-16 border-t border-slate-900 bg-slate-950/80 py-10 text-xs text-slate-500"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Film className="h-4 w-4 text-amber-400" />
            <span className="font-semibold text-slate-300">Unblocked Movies</span>
            <span>•</span>
            <span>Iframe JSON Movie Storage Architecture</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              Tab Cloak Active
            </span>
            <span>•</span>
            <span>
              Panic Hotkey: <kbd className="font-mono text-slate-300 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">Esc</kbd> or <kbd className="font-mono text-slate-300 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">~</kbd>
            </span>
            <span>•</span>
            <span>Open Public Domain & Creative Commons Streams</span>
          </div>

          <p className="text-[11px] text-slate-600 text-center md:text-right">
            All movies are stored as independent iframe JSON files. No AI features.
          </p>
        </div>
      </footer>
    </div>
  );
}
