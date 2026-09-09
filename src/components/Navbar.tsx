import React from 'react';
import {
  Film,
  EyeOff,
  Shield,
  PlusCircle,
  Bookmark,
  Sun,
  Moon,
  FileCode,
} from 'lucide-react';

interface NavbarProps {
  onOpenCloakModal: () => void;
  onTriggerPanic: () => void;
  onOpenAddStreamModal: () => void;
  onOpenCatalogModal: () => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  isCinemaDimmed: boolean;
  onToggleCinemaDimmed: () => void;
  activeCloakName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCloakModal,
  onTriggerPanic,
  onOpenAddStreamModal,
  onOpenCatalogModal,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  isCinemaDimmed,
  onToggleCinemaDimmed,
  activeCloakName,
}) => {
  return (
    <header
      id="navbar-header"
      className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md transition-colors"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div
            id="brand-logo-icon"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-inner"
          >
            <Film className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                id="brand-title"
                className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5"
              >
                Unblocked Movies
              </span>
              <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-mono font-medium text-amber-400 border border-amber-500/30">
                iframe JSON files
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 sm:block">
              Standalone Iframe JSON Storage • Direct Unblocked Stream Player
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Iframe JSON Files Catalog */}
          <button
            id="nav-json-catalog-btn"
            type="button"
            onClick={onOpenCatalogModal}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors"
            title="Browse all stored iframe JSON movie files"
          >
            <FileCode className="h-4 w-4" />
            <span className="hidden sm:inline">JSON Files</span>
          </button>

          {/* Watchlist Filter Button */}
          <button
            id="nav-watchlist-btn"
            type="button"
            onClick={onToggleFavoritesOnly}
            className={`relative flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              showFavoritesOnly
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
            }`}
            title="View Watchlist / Favorites"
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Watchlist</span>
            {favoritesCount > 0 && (
              <span
                id="watchlist-count-badge"
                className={`ml-0.5 rounded-full px-1.5 py-0.2 text-xs ${
                  showFavoritesOnly
                    ? 'bg-slate-950 text-amber-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Add / Import Iframe JSON Button */}
          <button
            id="nav-add-stream-btn"
            type="button"
            onClick={onOpenAddStreamModal}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors"
            title="Add or import an iframe JSON movie"
          >
            <PlusCircle className="h-4 w-4 text-emerald-400" />
            <span className="hidden md:inline">Add JSON</span>
            <span className="md:hidden">Add</span>
          </button>

          {/* Tab Cloaker Disguise Selector */}
          <button
            id="nav-cloak-modal-btn"
            type="button"
            onClick={onOpenCloakModal}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors"
            title="Cloak tab title and favicon (Google Classroom, Docs, etc.)"
          >
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="hidden lg:inline">Cloak:</span>
            <span className="text-slate-200 max-w-[80px] truncate hidden sm:inline">
              {activeCloakName}
            </span>
          </button>

          {/* Cinema Ambient Dimmer */}
          <button
            id="nav-cinema-dim-btn"
            type="button"
            onClick={onToggleCinemaDimmed}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              isCinemaDimmed
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-700/60'
            }`}
            title={isCinemaDimmed ? 'Turn lights on' : 'Cinema mode: Dim lights'}
          >
            {isCinemaDimmed ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Instant Panic Button */}
          <button
            id="nav-panic-btn"
            type="button"
            onClick={onTriggerPanic}
            className="flex items-center gap-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all shadow-sm hover:border-rose-400"
            title="Panic Button: Instantly pause and hide screen (Esc)"
          >
            <EyeOff className="h-4 w-4 text-rose-400 animate-pulse" />
            <span>Panic</span>
            <kbd className="hidden sm:inline rounded bg-rose-950/80 px-1 py-0.5 text-[10px] font-mono text-rose-300">
              Esc
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
