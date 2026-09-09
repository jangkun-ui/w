import { Movie, WatchProgress, CloakPreset } from '../types';

const FAVORITES_KEY = 'unblocked_movies_favorites';
const PROGRESS_KEY = 'unblocked_movies_progress';
const CUSTOM_MOVIES_KEY = 'unblocked_movies_custom';
const ACTIVE_CLOAK_KEY = 'unblocked_movies_active_cloak';

export const CLOAK_PRESETS: CloakPreset[] = [
  {
    id: 'default',
    name: 'Default (Cinema)',
    title: 'Unblocked Movies',
    faviconUrl: '/favicon.ico',
    badge: '🎬',
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes - Google Classroom',
    faviconUrl: 'https://ssl.gstatic.com/classroom/favicon.png',
    badge: '🏫',
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    faviconUrl: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    badge: '📄',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    faviconUrl: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
    badge: '📁',
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas LMS',
    faviconUrl: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico',
    badge: '🎯',
  },
  {
    id: 'desmos',
    name: 'Desmos Calculator',
    title: 'Desmos | Graphing Calculator',
    faviconUrl: 'https://www.desmos.com/favicon.ico',
    badge: '📐',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    faviconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
    badge: '📚',
  },
  {
    id: 'khan',
    name: 'Khan Academy',
    title: 'Dashboard | Khan Academy',
    faviconUrl: 'https://cdn.kastatic.org/images/favicon.ico',
    badge: '🎓',
  },
];

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): string[] {
  const current = getFavorites();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  } catch (err) {
    console.error(err);
  }
  return next;
}

export function getWatchProgress(): Record<string, WatchProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveWatchProgress(progress: WatchProgress): void {
  try {
    const current = getWatchProgress();
    current[progress.movieId] = progress;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  } catch (err) {
    console.error(err);
  }
}

export function clearWatchProgress(movieId: string): void {
  try {
    const current = getWatchProgress();
    delete current[movieId];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  } catch (err) {
    console.error(err);
  }
}

export function getCustomMovies(): Movie[] {
  try {
    const raw = localStorage.getItem(CUSTOM_MOVIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomMovie(movie: Movie): Movie[] {
  try {
    const current = getCustomMovies();
    const updated = [movie, ...current.filter((m) => m.id !== movie.id)];
    localStorage.setItem(CUSTOM_MOVIES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteCustomMovie(id: string): Movie[] {
  try {
    const current = getCustomMovies();
    const updated = current.filter((m) => m.id !== id);
    localStorage.setItem(CUSTOM_MOVIES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function applyTabCloak(preset: CloakPreset, customTitle?: string, customIcon?: string): void {
  const title = customTitle || preset.title;
  const iconUrl = customIcon || preset.faviconUrl;

  document.title = title;

  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = iconUrl;

  try {
    localStorage.setItem(
      ACTIVE_CLOAK_KEY,
      JSON.stringify({ id: preset.id, customTitle, customIcon })
    );
  } catch {}
}

export function getActiveCloak(): { id: string; customTitle?: string; customIcon?: string } | null {
  try {
    const raw = localStorage.getItem(ACTIVE_CLOAK_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
