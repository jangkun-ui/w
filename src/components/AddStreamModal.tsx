import React, { useState, useRef } from 'react';
import {
  PlusCircle,
  X,
  FileCode,
  Upload,
  Link as LinkIcon,
  Check,
  AlertCircle,
  Download,
  Code2,
} from 'lucide-react';
import { Movie } from '../types';
import { downloadMovieJsonFile } from '../data/movies';

interface AddStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovie: (movie: Movie) => void;
}

const SAMPLE_PRESETS = [
  {
    title: 'Spring (Open Blender Short)',
    iframeUrl: 'https://archive.org/embed/spring-open-movie',
    genre: 'Animation',
    year: 2019,
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    quality: '1080p' as const,
  },
  {
    title: 'His Girl Friday (Screwball Classic)',
    iframeUrl: 'https://archive.org/embed/HisGirlFriday_512kb',
    genre: 'Classics',
    year: 1940,
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    quality: 'Classic' as const,
  },
];

export const AddStreamModal: React.FC<AddStreamModalProps> = ({
  isOpen,
  onClose,
  onAddMovie,
}) => {
  const [tab, setTab] = useState<'form' | 'json' | 'upload'>('form');

  // Form State
  const [title, setTitle] = useState('');
  const [iframeSource, setIframeSource] = useState('');
  const [genre, setGenre] = useState('Sci-Fi');
  const [year, setYear] = useState(new Date().getFullYear());
  const [quality, setQuality] = useState<'4K' | '1080p' | '720p' | 'Classic'>('1080p');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  // Raw JSON state
  const [rawJson, setRawJson] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // File upload state
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Extract src from iframe HTML if user pasted <iframe src="...">
  const extractIframeSrc = (input: string): string => {
    const trimmed = input.trim();
    if (trimmed.startsWith('<iframe') && trimmed.includes('src="')) {
      const match = trimmed.match(/src="([^"]+)"/);
      if (match && match[1]) return match[1];
    }
    return trimmed;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !iframeSource.trim()) return;

    const finalSrc = extractIframeSrc(iframeSource);
    const cleanId = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const movieId = `movie-${cleanId}-${Date.now()}`;

    const newMovie: Movie = {
      id: movieId,
      title: title.trim(),
      year: Number(year) || new Date().getFullYear(),
      duration: 'Custom',
      durationSeconds: 1800,
      genres: [genre, 'Custom Streams'],
      rating: 8.5,
      quality,
      description: description.trim() || `Unblocked iframe stream for ${title.trim()}`,
      director: 'Community Stream',
      videoUrl: finalSrc,
      streamType: 'embed',
      posterUrl:
        posterUrl.trim() ||
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
      license: 'Custom Iframe Stream',
      isCustom: true,
      addedAt: Date.now(),
      jsonFileName: `movies/${cleanId}.json`,
      iframe: {
        src: finalSrc,
        html: `<iframe src="${finalSrc}" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`,
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        allowFullscreen: true,
        sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
      },
    };

    onAddMovie(newMovie);
    resetForm();
    onClose();
  };

  const handleRawJsonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJsonError(null);
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed.title || (!parsed.iframe?.src && !parsed.videoUrl && !parsed.iframe?.html)) {
        throw new Error('JSON must contain "title" and an "iframe" object with "src" or "html"');
      }

      const src = parsed.iframe?.src || extractIframeSrc(parsed.iframe?.html || parsed.videoUrl || '');
      const cleanId = (parsed.id || parsed.title).toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const movie: Movie = {
        id: parsed.id || `custom-${Date.now()}`,
        title: parsed.title,
        year: Number(parsed.year) || new Date().getFullYear(),
        duration: parsed.duration || 'Feature',
        durationSeconds: parsed.durationSeconds || 3600,
        genres: Array.isArray(parsed.genres) && parsed.genres.length > 0 ? parsed.genres : ['Custom Streams'],
        rating: Number(parsed.rating) || 8.0,
        quality: parsed.quality || '1080p',
        description: parsed.description || `Iframe stream for ${parsed.title}`,
        director: parsed.director || 'Imported Stream',
        cast: parsed.cast || [],
        posterUrl:
          parsed.posterUrl ||
          parsed.poster ||
          'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
        backdropUrl: parsed.backdropUrl || parsed.backdrop || '',
        license: parsed.license || 'Imported Stream',
        isCustom: true,
        addedAt: Date.now(),
        jsonFileName: parsed.jsonFileName || `movies/${cleanId}.json`,
        iframe: {
          src,
          html:
            parsed.iframe?.html ||
            `<iframe src="${src}" width="100%" height="100%" frameborder="0" allowfullscreen="true"></iframe>`,
          allow: parsed.iframe?.allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowFullscreen: parsed.iframe?.allowFullscreen ?? true,
          sandbox: parsed.iframe?.sandbox || 'allow-scripts allow-same-origin allow-presentation allow-forms',
        },
      };

      onAddMovie(movie);
      setRawJson('');
      onClose();
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON format');
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadError(null);
    if (!file.name.endsWith('.json')) {
      setUploadError('Please upload a valid .json file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed.title || (!parsed.iframe?.src && !parsed.videoUrl && !parsed.iframe?.html)) {
          throw new Error('Uploaded JSON is missing "title" or "iframe.src"');
        }

        const src = parsed.iframe?.src || extractIframeSrc(parsed.iframe?.html || parsed.videoUrl || '');
        const cleanId = (parsed.id || parsed.title).toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const movie: Movie = {
          id: parsed.id || `file-${Date.now()}`,
          title: parsed.title,
          year: Number(parsed.year) || new Date().getFullYear(),
          duration: parsed.duration || 'Feature',
          durationSeconds: parsed.durationSeconds || 3600,
          genres: Array.isArray(parsed.genres) ? parsed.genres : ['Custom Streams'],
          rating: Number(parsed.rating) || 8.5,
          quality: parsed.quality || '1080p',
          description: parsed.description || `Uploaded from ${file.name}`,
          director: parsed.director || 'Community',
          cast: parsed.cast || [],
          posterUrl:
            parsed.posterUrl ||
            parsed.poster ||
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
          backdropUrl: parsed.backdropUrl || parsed.backdrop || '',
          license: parsed.license || 'Imported File',
          isCustom: true,
          addedAt: Date.now(),
          jsonFileName: file.name,
          iframe: {
            src,
            html:
              parsed.iframe?.html ||
              `<iframe src="${src}" width="100%" height="100%" frameborder="0" allowfullscreen="true"></iframe>`,
            allow: parsed.iframe?.allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowFullscreen: parsed.iframe?.allowFullscreen ?? true,
            sandbox: parsed.iframe?.sandbox || 'allow-scripts allow-same-origin allow-presentation allow-forms',
          },
        };

        onAddMovie(movie);
        onClose();
      } catch (err: any) {
        setUploadError(err.message || 'Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const resetForm = () => {
    setTitle('');
    setIframeSource('');
    setGenre('Sci-Fi');
    setYear(new Date().getFullYear());
    setPosterUrl('');
    setDescription('');
  };

  const loadPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setTitle(preset.title);
    setIframeSource(preset.iframeUrl);
    setGenre(preset.genre);
    setYear(preset.year);
    setPosterUrl(preset.poster);
    setQuality(preset.quality);
  };

  return (
    <div
      id="add-stream-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="add-stream-modal-panel"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Movie Iframe JSON</h2>
              <p className="text-xs text-slate-400">
                Store and embed movies using standard iframe JSON files
              </p>
            </div>
          </div>
          <button
            id="close-add-modal-btn"
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-6 pt-2">
          <button
            type="button"
            onClick={() => setTab('form')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
              tab === 'form'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Form Generator
          </button>
          <button
            type="button"
            onClick={() => setTab('json')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
              tab === 'json'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Paste Iframe JSON
          </button>
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
              tab === 'upload'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Upload .json File
          </button>
        </div>

        {/* Body content based on tab */}
        <div className="p-6">
          {tab === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Preset buttons */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Try Sample Unblocked Streams
                </label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PRESETS.map((p) => (
                    <button
                      key={p.title}
                      type="button"
                      onClick={() => loadPreset(p)}
                      className="rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-xs px-2.5 py-1 text-slate-300 border border-slate-700 transition-colors"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Movie Title */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Movie Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Blade Runner (Public Stream)"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Iframe URL or Embed Code */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Iframe Source URL or &lt;iframe&gt; Tag *
                </label>
                <input
                  type="text"
                  required
                  value={iframeSource}
                  onChange={(e) => setIframeSource(e.target.value)}
                  placeholder="https://...mp4 or https://archive.org/embed/... or <iframe src='...'>"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none font-mono text-xs"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Accepts direct video stream URLs, Archive.org embed links, or full &lt;iframe&gt; codes.
                </p>
              </div>

              {/* Genre & Year & Quality */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Animation">Animation</option>
                    <option value="Horror & Mystery">Horror</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Classics">Classics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Quality</label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value as any)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                    <option value="720p">720p</option>
                    <option value="Classic">Classic</option>
                  </select>
                </div>
              </div>

              {/* Poster URL */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Poster Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  id="submit-add-stream-btn"
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 text-xs transition-colors shadow-lg"
                >
                  <PlusCircle className="h-4 w-4" />
                  Save as Iframe JSON & Stream
                </button>
              </div>
            </form>
          )}

          {tab === 'json' && (
            <form onSubmit={handleRawJsonSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    Paste Movie Iframe JSON Object
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setRawJson(
                        JSON.stringify(
                          {
                            title: 'Sample Movie',
                            year: 2024,
                            genre: ['Sci-Fi'],
                            quality: '1080p',
                            posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
                            iframe: {
                              src: 'https://archive.org/embed/Sintel',
                              allow: 'accelerometer; autoplay; encrypted-media',
                              allowFullscreen: true,
                            },
                          },
                          null,
                          2
                        )
                      );
                    }}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Insert Template
                  </button>
                </div>
                <textarea
                  rows={9}
                  value={rawJson}
                  onChange={(e) => setRawJson(e.target.value)}
                  placeholder={`{\n  "title": "Movie Title",\n  "iframe": {\n    "src": "https://...",\n    "allow": "accelerometer; autoplay; encrypted-media"\n  }\n}`}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 p-3 font-mono text-xs text-amber-200/90 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {jsonError && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/30 p-2.5 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{jsonError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  id="import-raw-json-btn"
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 text-xs transition-colors shadow-lg"
                >
                  <Code2 className="h-4 w-4" />
                  Import & Save Movie
                </button>
              </div>
            </form>
          )}

          {tab === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              <div
                id="drop-zone-container"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                  dragOver
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-slate-700 hover:border-slate-500 bg-slate-950/60'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-amber-400 mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-white mb-1">
                  Drag & Drop an Iframe JSON file here
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  or click to browse your computer for a <code className="text-amber-300">.json</code> movie file
                </p>
                <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 font-medium border border-slate-700">
                  Select .json File
                </span>
              </div>

              {uploadError && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/30 p-2.5 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tip: You can export any movie's JSON file using the "Iframe JSON Files" explorer, modify it, and re-import it here at any time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
