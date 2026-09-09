import React from 'react';
import { Play, Bookmark, Clock, Star, Trash2, FileCode } from 'lucide-react';
import { Movie, WatchProgress } from '../types';
import { formatDuration } from '../utils/storage';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  progress?: WatchProgress;
  onDeleteCustom?: (id: string) => void;
  onViewJson?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPlay,
  isFavorite,
  onToggleFavorite,
  progress,
  onDeleteCustom,
  onViewJson,
}) => {
  const percent =
    progress && progress.duration > 0
      ? Math.min(100, Math.round((progress.currentTime / progress.duration) * 100))
      : 0;

  return (
    <div
      id={`movie-card-${movie.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
    >
      {/* Thumbnail Aspect Ratio Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden bg-slate-950">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges & Actions */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold shadow-md ${
              movie.quality === '4K'
                ? 'bg-amber-500 text-slate-950'
                : movie.quality === '1080p'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800/90 text-slate-200 border border-slate-700'
            }`}
          >
            {movie.quality}
          </span>

          <div className="flex items-center gap-1 pointer-events-auto">
            {onViewJson && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewJson(movie);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-400 backdrop-blur-sm border border-slate-700 transition-colors"
                title="View Iframe JSON File"
              >
                <FileCode className="h-3.5 w-3.5" />
              </button>
            )}

            {movie.isCustom && onDeleteCustom && (
              <button
                id={`delete-custom-${movie.id}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCustom(movie.id);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 hover:bg-rose-900/80 text-slate-300 hover:text-rose-200 backdrop-blur-sm border border-slate-700 transition-colors"
                title="Remove custom stream"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              id={`favorite-btn-${movie.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie.id);
              }}
              className={`flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm border transition-all ${
                isFavorite
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:border-slate-500'
              }`}
              title={isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className="h-3.5 w-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Center Hover Play Button */}
        <div
          onClick={() => onPlay(movie)}
          className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-xl group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Continue Watching Progress bar on card */}
        {percent > 0 && percent < 95 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div className="h-full bg-amber-400" style={{ width: `${percent}%` }} />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <div className="flex items-center justify-between gap-1 text-xs text-slate-400 mb-1">
            <div className="flex items-center gap-1.5 font-medium">
              <span>{movie.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {movie.duration}
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="h-3 w-3 fill-amber-400" />
              <span>{movie.rating}</span>
            </div>
          </div>

          <h3
            id={`title-${movie.id}`}
            onClick={() => onPlay(movie)}
            className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {movie.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Footer info: Genres & Resume/Play CTA */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300"
              >
                {genre}
              </span>
            ))}
          </div>

          <button
            id={`play-action-btn-${movie.id}`}
            type="button"
            onClick={() => onPlay(movie)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            {percent > 0 ? (
              <span>Resume ({formatDuration(progress!.currentTime)})</span>
            ) : (
              <span>Watch Now</span>
            )}
            <Play className="h-3 w-3 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
