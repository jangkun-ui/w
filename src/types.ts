export interface MovieIframe {
  src: string;
  html?: string;
  allow?: string;
  allowFullscreen?: boolean;
  sandbox?: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string; // e.g. "12m", "1h 36m"
  durationSeconds?: number;
  genres: string[];
  rating: number; // e.g. 8.4
  quality: '4K' | '1080p' | '720p' | 'Classic';
  description: string;
  director: string;
  cast?: string[];
  videoUrl?: string;
  streamType?: 'mp4' | 'embed';
  posterUrl: string;
  backdropUrl?: string;
  license: string; // e.g. "Creative Commons / Blender Open", "Public Domain"
  isFeatured?: boolean;
  isCustom?: boolean;
  addedAt?: number;
  iframe: MovieIframe;
  jsonFileName?: string;
}

export interface WatchProgress {
  movieId: string;
  currentTime: number;
  duration: number;
  lastWatched: number;
  completed?: boolean;
}

export interface CloakPreset {
  id: string;
  name: string;
  title: string;
  faviconUrl: string;
  badge: string;
}

export type SortOption = 'featured' | 'rating' | 'year' | 'title' | 'duration';
