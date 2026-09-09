import React, { useState } from 'react';
import { X, FileCode, Download, ExternalLink, Play, Copy, Check } from 'lucide-react';
import { Movie } from '../types';
import { formatMovieIframeJson, downloadMovieJsonFile } from '../data/movies';

interface IframeCatalogModalProps {
  movies: Movie[];
  isOpen: boolean;
  onClose: () => void;
  onPlayMovie: (movie: Movie) => void;
  onOpenAddModal: () => void;
}

export const IframeCatalogModal: React.FC<IframeCatalogModalProps> = ({
  movies,
  isOpen,
  onClose,
  onPlayMovie,
  onOpenAddModal,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(movies[0] || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentMovie = selectedMovie || movies[0];
  const jsonPreview = currentMovie ? formatMovieIframeJson(currentMovie) : '';

  const handleCopy = (movie: Movie) => {
    navigator.clipboard.writeText(formatMovieIframeJson(movie)).then(() => {
      setCopiedId(movie.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div
      id="iframe-catalog-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="iframe-catalog-modal-panel"
        className="relative flex flex-col w-full max-w-4xl h-[85vh] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Stored Iframe JSON Files
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
                  {movies.length} Files
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Each movie is maintained and streamed via an independent iframe JSON file
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="catalog-add-json-btn"
              type="button"
              onClick={() => {
                onClose();
                onOpenAddModal();
              }}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition-colors"
            >
              + Add / Import JSON
            </button>
            <button
              id="catalog-close-btn"
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - Two Column Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0 overflow-hidden">
          {/* Left Column: File List */}
          <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto p-3 space-y-1.5 bg-slate-950/50">
            <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Iframe JSON Files (/public/movies/)
            </div>
            {movies.map((m) => {
              const isSelected = currentMovie?.id === m.id;
              const fileName = m.jsonFileName || `movies/${m.id}.json`;
              return (
                <div
                  key={m.id}
                  id={`catalog-file-${m.id}`}
                  onClick={() => setSelectedMovie(m)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <FileCode
                      className={`h-4 w-4 shrink-0 ${
                        isSelected ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold truncate text-white">{m.title}</p>
                      <p className="font-mono text-[11px] text-slate-400 truncate">{fileName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(m);
                      }}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Copy JSON content"
                    >
                      {copiedId === m.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadMovieJsonFile(m);
                      }}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Download .json file"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: JSON Preview & Actions */}
          <div className="md:col-span-7 flex flex-col min-h-0 bg-slate-950 p-4">
            {currentMovie ? (
              <div className="flex flex-col h-full">
                {/* File Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-300 font-medium">
                      {currentMovie.jsonFileName || `movies/${currentMovie.id}.json`}
                    </span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                      {currentMovie.quality}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="catalog-play-movie-btn"
                      type="button"
                      onClick={() => {
                        onClose();
                        onPlayMovie(currentMovie);
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition-colors"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Stream Iframe
                    </button>
                    <button
                      id="catalog-download-selected-btn"
                      type="button"
                      onClick={() => downloadMovieJsonFile(currentMovie)}
                      className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Save .json
                    </button>
                  </div>
                </div>

                {/* Code Window */}
                <div className="flex-1 min-h-0 my-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 flex flex-col">
                  <pre className="flex-1 overflow-auto p-4 font-mono text-xs text-amber-200/90 leading-relaxed">
                    <code>{jsonPreview}</code>
                  </pre>
                </div>

                {/* Direct Iframe Embed Info */}
                <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 text-xs flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <span className="text-slate-400">Iframe Target URL: </span>
                    <span className="font-mono text-slate-200 truncate block sm:inline">
                      {currentMovie.iframe?.src || currentMovie.videoUrl}
                    </span>
                  </div>
                  <a
                    href={currentMovie.iframe?.src || currentMovie.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold shrink-0"
                  >
                    Direct <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm">
                Select a file to inspect its iframe JSON code
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
