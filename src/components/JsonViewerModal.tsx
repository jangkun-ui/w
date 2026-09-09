import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, ExternalLink } from 'lucide-react';
import { Movie } from '../types';
import { formatMovieIframeJson, downloadMovieJsonFile } from '../data/movies';

interface JsonViewerModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JsonViewerModal: React.FC<JsonViewerModalProps> = ({
  movie,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !movie) return null;

  const jsonString = formatMovieIframeJson(movie);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    downloadMovieJsonFile(movie);
  };

  return (
    <div
      id="json-viewer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="json-viewer-modal-panel"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileCode className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Iframe JSON File
                <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-mono text-amber-300 border border-slate-700">
                  {movie.jsonFileName || `${movie.id}.json`}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Direct iframe embed configuration and metadata for {movie.title}
              </p>
            </div>
          </div>
          <button
            id="json-viewer-close-btn"
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content / Code Preview */}
        <div className="p-5">
          <div className="relative">
            <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 text-xs text-slate-400 font-mono">
              <span>{movie.jsonFileName || `${movie.id}.json`}</span>
              <span className="text-[11px] text-slate-500">application/json</span>
            </div>
            <pre className="max-h-96 overflow-auto rounded-b-lg border border-slate-800 bg-slate-950/90 p-4 font-mono text-xs text-amber-200/90 leading-relaxed selection:bg-amber-500 selection:text-slate-950">
              <code>{jsonString}</code>
            </pre>
          </div>

          {/* Quick info badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Iframe Target:</span>
            <code className="rounded bg-slate-950 px-2 py-1 text-slate-300 border border-slate-800 font-mono text-[11px] truncate max-w-md">
              {movie.iframe?.src || movie.videoUrl}
            </code>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-5 py-3.5">
          <button
            id="json-viewer-download-btn"
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download .json
          </button>

          <div className="flex items-center gap-2">
            <button
              id="json-viewer-copy-btn"
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 transition-colors shadow-md"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied to Clipboard' : 'Copy JSON'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
