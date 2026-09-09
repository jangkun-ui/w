import React from 'react';
import { Play, X, Clock } from 'lucide-react';
import { Movie, WatchProgress } from '../types';
import { formatDuration } from '../utils/storage';

interface ContinueWatchingBarProps {
  movies: Movie[];
  progressMap: Record<string, WatchProgress>;
  onPlay: (movie: Movie) => void;
  onClearProgress: (movieId: string) => void;
}

export const ContinueWatchingBar: React.FC<ContinueWatchingBarProps> = ({
  movies,
  progressMap,
  onPlay,
  onClearProgress,
}) => {
  // Find movies that have progress saved
  const inProgressList = movies
    .map((m) => {
      const p = progressMap[m.id];
      return { movie: m, progress: p };
    })
    .filter(
      (item) =>
        item.progress &&
        item.progress.currentTime > 5 &&
        item.progress.currentTime < (item.progress.duration - 15)
    );

  if (inProgressList.length === 0) return null;

  return (
    <section id="continue-watching-section" className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-400" />
          <h2 id="continue-watching-heading" className="text-sm sm:text-base font-bold text-white">
            Continue Watching
          </h2>
          <span className="rounded-full bg-amber-500/15 px-2 py-0.2 text-[11px] font-semibold text-amber-300">
            {inProgressList.length}
          </span>
        </div>
      </div>

      <div
        id="continue-watching-carousel"
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800"
      >
        {inProgressList.map(({ movie, progress }) => {
          const percent = Math.min(
            100,
            Math.round((progress.currentTime / progress.duration) * 100)
          );
          const remainingSeconds = Math.max(0, progress.duration - progress.currentTime);

          return (
            <div
              key={movie.id}
              id={`continue-card-${movie.id}`}
              className="group relative flex-shrink-0 w-64 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all shadow-md"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => onPlay(movie)}
                className="relative aspect-video w-full cursor-pointer overflow-hidden bg-slate-950"
              >
                <img
                  src={movie.backdropUrl || movie.posterUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-lg">
                    <Play className="h-5 w-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                  <div className="h-full bg-amber-400" style={{ width: `${percent}%` }} />
                </div>
              </div>

              {/* Text & Dismiss */}
              <div className="p-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h4
                    onClick={() => onPlay(movie)}
                    className="text-xs font-bold text-white truncate hover:text-amber-300 cursor-pointer"
                  >
                    {movie.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>{formatDuration(progress.currentTime)}</span>
                    <span>•</span>
                    <span>{formatDuration(remainingSeconds)} left</span>
                  </div>
                </div>

                <button
                  id={`dismiss-progress-${movie.id}`}
                  type="button"
                  onClick={() => onClearProgress(movie.id)}
                  className="flex h-6 w-6 items-center justify-center rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  title="Remove from continue watching"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
