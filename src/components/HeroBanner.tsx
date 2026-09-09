import React from 'react';
import { Play, Bookmark, Star, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { Movie } from '../types';

interface HeroBannerProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onPlay,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div
      id="hero-banner-section"
      className="relative mb-8 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl"
    >
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover object-center opacity-40 filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl p-6 sm:p-8 md:p-10 text-white space-y-3 sm:space-y-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            id="hero-featured-badge"
            className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 font-bold text-amber-300 border border-amber-500/30"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Featured Premiere
          </span>
          <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-slate-300 border border-slate-700">
            {movie.quality} Ultra HD
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            {movie.rating}
          </span>
          <span className="flex items-center gap-1 text-slate-300 font-medium">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {movie.duration}
          </span>
        </div>

        {/* Title */}
        <h1
          id="hero-movie-title"
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
        >
          {movie.title}
        </h1>

        {/* Description */}
        <p
          id="hero-movie-desc"
          className="text-xs sm:text-sm md:text-base text-slate-300 line-clamp-3 leading-relaxed max-w-xl"
        >
          {movie.description}
        </p>

        {/* Meta / Cast & Genres */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
          {movie.genres.map((g) => (
            <span
              key={g}
              className="rounded-md bg-slate-900/90 px-2.5 py-1 text-slate-200 border border-slate-700/80"
            >
              {g}
            </span>
          ))}
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            {movie.license}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            id="hero-watch-btn"
            type="button"
            onClick={() => onPlay(movie)}
            className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:scale-102 transition-all cursor-pointer"
          >
            <Play className="h-5 w-5 fill-current" />
            <span>Watch Now</span>
          </button>

          <button
            id="hero-bookmark-btn"
            type="button"
            onClick={() => onToggleFavorite(movie.id)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
              isFavorite
                ? 'bg-slate-800 text-amber-300 border-amber-500/50'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'In Watchlist' : 'Add to Watchlist'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
