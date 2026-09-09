import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  Bookmark,
  ExternalLink,
  Settings,
  AlertCircle,
  Film,
  FileCode,
  Download,
  Share2,
  Check,
  Eye,
  MonitorPlay,
  Keyboard,
} from 'lucide-react';
import { Movie } from '../types';
import { formatDuration } from '../utils/storage';
import { downloadMovieJsonFile } from '../data/movies';
import { JsonViewerModal } from './JsonViewerModal';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
  initialTime?: number;
  onSaveProgress: (currentTime: number, duration: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  movie,
  onClose,
  initialTime = 0,
  onSaveProgress,
  isFavorite,
  onToggleFavorite,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(movie.durationSeconds || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [playerMode, setPlayerMode] = useState<'iframe' | 'native'>(
    movie.streamType === 'embed' || !movie.videoUrl?.endsWith('.mp4') ? 'iframe' : 'iframe'
  );

  const iframeSrc = movie.iframe?.src || movie.videoUrl || '';

  // Resume playback from initialTime once video is ready (if native video mode)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || movie.durationSeconds || 0);
      setIsLoading(false);
      if (initialTime > 0 && initialTime < (video.duration || Infinity)) {
        video.currentTime = initialTime;
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (Math.floor(video.currentTime) % 4 === 0) {
        onSaveProgress(video.currentTime, video.duration || duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      onSaveProgress(video.currentTime, video.duration || duration);
    };
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [initialTime, movie.durationSeconds, onSaveProgress, playerMode]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skip(10);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skip(-10);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsTheater((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const skip = (delta: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 100000, video.currentTime + delta));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const handleSpeedSelect = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(iframeSrc).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Open in about:blank cloak (classic unblocked site stealth tab)
  const openAboutBlankCloak = () => {
    try {
      const win = window.open('about:blank', '_blank');
      if (win) {
        win.document.title = 'Google Docs';
        const doc = win.document;
        doc.body.style.margin = '0';
        doc.body.style.height = '100vh';
        doc.body.style.backgroundColor = '#000';
        const iframe = doc.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.allow =
          movie.iframe?.allow ||
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.setAttribute('allowfullscreen', 'true');
        doc.body.appendChild(iframe);
      }
    } catch {
      window.open(iframeSrc, '_blank');
    }
  };

  return (
    <div
      id="video-player-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex flex-col items-center justify-start p-2 sm:p-4 md:p-6"
    >
      {/* Top Header / Action Bar */}
      <div
        id="player-top-bar"
        className={`w-full flex flex-wrap items-center justify-between py-3 mb-2 gap-2 transition-all ${
          isTheater ? 'max-w-full px-4' : 'max-w-5xl'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="player-back-btn"
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 text-xs sm:text-sm font-medium border border-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Close</span>
          </button>

          <span
            id="player-current-title"
            className="text-sm sm:text-base font-semibold text-white max-w-[160px] sm:max-w-xs md:max-w-md truncate"
          >
            {movie.title}
          </span>
          <span className="hidden sm:inline-flex items-center rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
            {movie.quality}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Iframe JSON File Viewer Button */}
          <button
            id="player-view-json-btn"
            type="button"
            onClick={() => setIsJsonModalOpen(true)}
            className="flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 px-2.5 py-1.5 text-xs font-mono border border-slate-800 transition-colors"
            title="View raw iframe JSON configuration"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span className="hidden md:inline">.json</span>
          </button>

          {/* Download JSON Button */}
          <button
            id="player-download-json-btn"
            type="button"
            onClick={() => downloadMovieJsonFile(movie)}
            className="flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1.5 text-xs border border-slate-800 transition-colors"
            title="Download movie as iframe JSON file"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Download</span>
          </button>

          {/* Unblocked Stealth / about:blank Pop-out */}
          <button
            id="player-stealth-cloak-btn"
            type="button"
            onClick={openAboutBlankCloak}
            className="flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1.5 text-xs border border-slate-800 transition-colors"
            title="Open in stealth about:blank window to bypass browser history and firewalls"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Stealth Window</span>
          </button>

          {/* Theater Mode Button */}
          <button
            id="player-theater-toggle-btn"
            type="button"
            onClick={() => setIsTheater((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors ${
              isTheater
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
            }`}
            title="Toggle Theater Mode (T)"
          >
            <MonitorPlay className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Theater</span>
          </button>

          {/* Bookmark / Watchlist */}
          <button
            id="player-favorite-btn"
            type="button"
            onClick={onToggleFavorite}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors ${
              isFavorite
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-semibold'
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Watchlist'}</span>
          </button>

          {/* Share Stream Link */}
          <button
            id="player-share-btn"
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1.5 text-xs border border-slate-800 transition-colors"
            title="Copy video stream link"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Video Stage Container */}
      <div
        id="video-stage-container"
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 shadow-2xl transition-all ${
          isTheater ? 'max-w-full aspect-video sm:h-[82vh]' : 'max-w-5xl aspect-video'
        }`}
      >
        {/* Iframe Playback Mode */}
        {playerMode === 'iframe' ? (
          <iframe
            id="movie-embed-frame"
            src={iframeSrc}
            title={movie.title}
            className="h-full w-full border-0 bg-black"
            allow={
              movie.iframe?.allow ||
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            }
            allowFullScreen={movie.iframe?.allowFullscreen ?? true}
            sandbox={
              movie.iframe?.sandbox ||
              'allow-scripts allow-same-origin allow-presentation allow-forms'
            }
          />
        ) : (
          /* Native Video Mode (when stream is direct mp4 and user toggled it) */
          <>
            <video
              id="movie-html5-video"
              ref={videoRef}
              src={iframeSrc}
              poster={movie.backdropUrl || movie.posterUrl}
              playsInline
              onClick={togglePlay}
              className="h-full w-full object-contain cursor-pointer bg-black"
            />

            {/* Error Message if stream fails */}
            {hasError && (
              <div
                id="player-error-state"
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center"
              >
                <AlertCircle className="h-12 w-12 text-rose-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Direct Stream Issue</h3>
                <p className="text-sm text-slate-400 max-w-md mb-4">
                  This video may require iframe embed mode or an external tab to play.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPlayerMode('iframe')}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 text-sm"
                  >
                    Switch to Iframe Embed
                  </button>
                  <a
                    id="player-open-tab-btn"
                    href={iframeSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Source
                  </a>
                </div>
              </div>
            )}

            {/* Centered Play Button when paused */}
            {!isPlaying && !hasError && (
              <button
                id="center-play-trigger"
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/90 text-slate-950 shadow-2xl hover:scale-110 hover:bg-amber-400 transition-all"
                aria-label="Play video"
              >
                <Play className="h-9 w-9 ml-1 fill-current" />
              </button>
            )}

            {/* Video Controls Bar */}
            <div
              id="player-controls-bar"
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-4 text-white transition-opacity"
            >
              {/* Scrubber Progress Bar */}
              <div className="group relative flex items-center mb-3">
                <input
                  id="player-timeline-scrubber"
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-700/80 accent-amber-400 focus:outline-none transition-all hover:h-2"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Play / Pause */}
                  <button
                    id="ctrl-play-pause-btn"
                    type="button"
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5 fill-current" />}
                  </button>

                  {/* Skip -10s */}
                  <button
                    id="ctrl-rewind-btn"
                    type="button"
                    onClick={() => skip(-10)}
                    className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Rewind 10 seconds (Left Arrow)"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>

                  {/* Skip +10s */}
                  <button
                    id="ctrl-forward-btn"
                    type="button"
                    onClick={() => skip(10)}
                    className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Forward 10 seconds (Right Arrow)"
                  >
                    <RotateCw className="h-4 w-4" />
                  </button>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-1.5 group">
                    <button
                      id="ctrl-mute-btn"
                      type="button"
                      onClick={toggleMute}
                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-4 w-4 text-rose-400" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                    <input
                      id="ctrl-volume-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-14 sm:w-20 h-1.5 cursor-pointer appearance-none rounded bg-slate-700 accent-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Timestamp Display */}
                  <div id="ctrl-time-display" className="text-xs font-mono text-slate-300">
                    <span>{formatDuration(currentTime)}</span>
                    <span className="mx-1 text-slate-600">/</span>
                    <span>{formatDuration(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Playback Speed Menu */}
                  <div className="relative">
                    <button
                      id="ctrl-speed-menu-btn"
                      type="button"
                      onClick={() => setShowSpeedMenu((prev) => !prev)}
                      className="flex items-center gap-1 rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-xs font-medium text-slate-200 transition-colors"
                      title="Playback Speed"
                    >
                      <Settings className="h-3 w-3" />
                      <span>{playbackSpeed}x</span>
                    </button>

                    {showSpeedMenu && (
                      <div
                        id="speed-dropdown"
                        className="absolute bottom-10 right-0 z-10 w-28 rounded-lg bg-slate-900 border border-slate-700 py-1.5 shadow-xl"
                      >
                        <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Speed
                        </div>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSpeedSelect(s)}
                            className={`flex w-full items-center justify-between px-3 py-1 text-xs transition-colors ${
                              playbackSpeed === s
                                ? 'bg-amber-500/20 text-amber-300 font-bold'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span>{s}x</span>
                            {playbackSpeed === s && <span className="text-amber-400">✓</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    id="ctrl-fullscreen-btn"
                    type="button"
                    onClick={toggleFullscreen}
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Movie Details Under Video */}
      <div
        id="player-movie-details"
        className={`w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-6 mt-4 shadow-xl text-slate-200 transition-all ${
          isTheater ? 'max-w-full' : 'max-w-5xl'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="details-movie-title" className="text-xl sm:text-2xl font-bold text-white">
                {movie.title}
              </h2>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-300 border border-slate-700">
                {movie.year}
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-300 border border-slate-700">
                {movie.duration}
              </span>
              <span className="rounded bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
                ★ {movie.rating}
              </span>
              <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300 border border-emerald-500/30">
                {movie.license}
              </span>
              <span className="rounded bg-slate-800/80 px-2 py-0.5 text-xs font-mono text-amber-300 border border-slate-700">
                {movie.jsonFileName || `${movie.id}.json`}
              </span>
            </div>

            <p id="details-movie-desc" className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {movie.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <div>
                <span className="text-slate-500">Director: </span>
                <span className="text-slate-200 font-medium">{movie.director}</span>
              </div>
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <span className="text-slate-500">Cast: </span>
                  <span className="text-slate-200">{movie.cast.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Genre badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/60"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts & Iframe Controls Info Box */}
          <div className="hidden lg:block shrink-0 rounded-lg bg-slate-950/60 border border-slate-800 p-3.5 text-xs text-slate-400 space-y-2 w-60">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
              <Keyboard className="h-3.5 w-3.5 text-amber-400" />
              <span>Unblocked Controls</span>
            </div>
            <div className="flex justify-between">
              <span>Fullscreen:</span>
              <kbd className="font-mono text-slate-300 bg-slate-800 px-1 rounded">F</kbd>
            </div>
            <div className="flex justify-between">
              <span>Theater Mode:</span>
              <kbd className="font-mono text-slate-300 bg-slate-800 px-1 rounded">T</kbd>
            </div>
            <div className="flex justify-between">
              <span>Panic / Hide:</span>
              <kbd className="font-mono text-rose-200 bg-rose-950 px-1 rounded">~ or Esc</kbd>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setIsJsonModalOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 rounded-md bg-slate-800 hover:bg-slate-700 py-1.5 text-xs text-amber-300 font-medium transition-colors"
              >
                <FileCode className="h-3 w-3" />
                Inspect Iframe JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* JSON File Viewer Modal */}
      <JsonViewerModal
        movie={movie}
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
      />
    </div>
  );
};
