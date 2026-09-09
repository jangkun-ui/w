import { Movie } from '../types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'tears-of-steel',
    title: 'Tears of Steel',
    year: 2012,
    duration: '12m 14s',
    durationSeconds: 734,
    genres: ['Sci-Fi', 'Action'],
    rating: 8.9,
    quality: '4K',
    description:
      'In a dystopian future set in Amsterdam, a group of rebel warriors and scientists stage an audacious mission to reset humanity by reconnecting with a giant cybernetic entity.',
    director: 'Ian Hubert',
    cast: ['Derek de Lint', 'Sergio Hasselbaink', 'Rogan Kelly', 'Vanja Rukavina'],
    videoUrl: 'https://archive.org/embed/Tears-of-Steel',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    license: 'Creative Commons 3.0 (Blender Open Movie)',
    isFeatured: true,
    jsonFileName: 'movies/tears-of-steel.json',
    iframe: {
      src: 'https://archive.org/embed/Tears-of-Steel',
      html: '<iframe src="https://archive.org/embed/Tears-of-Steel" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'sintel',
    title: 'Sintel',
    year: 2010,
    duration: '15m 00s',
    durationSeconds: 900,
    genres: ['Animation', 'Fantasy', 'Adventure'],
    rating: 8.7,
    quality: '1080p',
    description:
      'A lonely young warrior named Sintel befriends a wounded baby dragon. When the creature is captured by an adult beast, she embarks on a dangerous mountain pilgrimage to bring it home.',
    director: 'Colin Levy',
    cast: ['Halina Reijn', 'Thom Hoffman'],
    videoUrl: 'https://archive.org/embed/Sintel',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    license: 'Creative Commons 3.0 (Durian Project)',
    isFeatured: true,
    jsonFileName: 'movies/sintel.json',
    iframe: {
      src: 'https://archive.org/embed/Sintel',
      html: '<iframe src="https://archive.org/embed/Sintel" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    year: 2008,
    duration: '9m 56s',
    durationSeconds: 596,
    genres: ['Animation', 'Comedy'],
    rating: 8.5,
    quality: '1080p',
    description:
      'A giant, gentle woodland rabbit has his tranquil morning ruined by three mischievous forest bullies: Frank the flying squirrel, Rinky the red squirrel, and Gimera the chinchilla.',
    director: 'Sacha Goedegebure',
    cast: ['Big Buck Bunny', 'Frank', 'Rinky', 'Gimera'],
    videoUrl: 'https://archive.org/embed/BigBuckBunny_328',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1600&auto=format&fit=crop&q=80',
    license: 'Creative Commons 3.0 (Peach Open Movie)',
    isFeatured: true,
    jsonFileName: 'movies/big-buck-bunny.json',
    iframe: {
      src: 'https://archive.org/embed/BigBuckBunny_328',
      html: '<iframe src="https://archive.org/embed/BigBuckBunny_328" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'night-of-the-living-dead',
    title: 'Night of the Living Dead',
    year: 1968,
    duration: '1h 36m',
    durationSeconds: 5760,
    genres: ['Horror & Mystery', 'Classics'],
    rating: 8.8,
    quality: 'Classic',
    description:
      'A disparate group of strangers seek refuge in an isolated farmhouse while hordes of reanimated corpses wander the Pennsylvania countryside in search of living human flesh.',
    director: 'George A. Romero',
    cast: ['Duane Jones', 'Judith O’Dea', 'Karl Hardman', 'Marilyn Eastman'],
    videoUrl: 'https://archive.org/embed/Night.Of.The.Living.Dead_1080p',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain (1968 Original Uncut)',
    isFeatured: false,
    jsonFileName: 'movies/night-of-the-living-dead.json',
    iframe: {
      src: 'https://archive.org/embed/Night.Of.The.Living.Dead_1080p',
      html: '<iframe src="https://archive.org/embed/Night.Of.The.Living.Dead_1080p" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'charade',
    title: 'Charade',
    year: 1963,
    duration: '1h 53m',
    durationSeconds: 6780,
    genres: ['Horror & Mystery', 'Comedy', 'Classics'],
    rating: 8.9,
    quality: 'Classic',
    description:
      'A newly widowed woman in Paris finds herself pursued by several menacing men demanding a fortune hidden by her murdered husband, aided only by a charming stranger of fluid identities.',
    director: 'Stanley Donen',
    cast: ['Cary Grant', 'Audrey Hepburn', 'Walter Matthau', 'James Coburn'],
    videoUrl: 'https://archive.org/embed/la35ca-Cinema_35_-_Charade_1963',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain (Paramount / Universal)',
    isFeatured: false,
    jsonFileName: 'movies/charade.json',
    iframe: {
      src: 'https://archive.org/embed/la35ca-Cinema_35_-_Charade_1963',
      html: '<iframe src="https://archive.org/embed/la35ca-Cinema_35_-_Charade_1963" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'the-general',
    title: 'The General',
    year: 1926,
    duration: '1h 15m',
    durationSeconds: 4500,
    genres: ['Comedy', 'Action', 'Classics'],
    rating: 9.1,
    quality: 'Classic',
    description:
      'Buster Keaton stars in one of the greatest silent comedies and action masterpieces ever filmed. When Union spies steal his beloved locomotive, an intrepid engineer sets off alone.',
    director: 'Buster Keaton & Clyde Bruckman',
    cast: ['Buster Keaton', 'Marion Mack', 'Glen Cavender'],
    videoUrl: 'https://archive.org/embed/TheGeneral1926',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain Master',
    isFeatured: false,
    jsonFileName: 'movies/the-general.json',
    iframe: {
      src: 'https://archive.org/embed/TheGeneral1926',
      html: '<iframe src="https://archive.org/embed/TheGeneral1926" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'carnival-of-souls',
    title: 'Carnival of Souls',
    year: 1962,
    duration: '1h 18m',
    durationSeconds: 4680,
    genres: ['Horror & Mystery', 'Classics'],
    rating: 8.2,
    quality: 'Classic',
    description:
      'Following a tragic car accident off a bridge, Mary moves to Utah to accept a church organist position, only to be haunted by a ghoulish phantom and drawn to an abandoned lakeside pavilion.',
    director: 'Herk Harvey',
    cast: ['Candace Hilligoss', 'Frances Feist', 'Sidney Berger'],
    videoUrl: 'https://archive.org/embed/CarnivalOfSoulsVideoQualityUpgrade',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain (Herts-Lion)',
    isFeatured: false,
    jsonFileName: 'movies/carnival-of-souls.json',
    iframe: {
      src: 'https://archive.org/embed/CarnivalOfSoulsVideoQualityUpgrade',
      html: '<iframe src="https://archive.org/embed/CarnivalOfSoulsVideoQualityUpgrade" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'gullivers-travels',
    title: "Gulliver's Travels",
    year: 1939,
    duration: '1h 16m',
    durationSeconds: 4560,
    genres: ['Animation', 'Adventure', 'Classics'],
    rating: 8.0,
    quality: 'Classic',
    description:
      'Max Fleischer’s groundbreaking full-color cel-animated feature adaptation of Jonathan Swift’s classic tale. Lemuel Gulliver washes ashore on the island kingdom of Lilliput.',
    director: 'Dave Fleischer',
    cast: ['Sam Parker', 'Jessica Dragonette', 'Lanny Ross'],
    videoUrl: 'https://archive.org/embed/gullivers_travels1939',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain (Fleischer Studios)',
    isFeatured: false,
    jsonFileName: 'movies/gullivers-travels.json',
    iframe: {
      src: 'https://archive.org/embed/gullivers_travels1939',
      html: '<iframe src="https://archive.org/embed/gullivers_travels1939" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'trip-to-the-moon',
    title: 'A Trip to the Moon (Le Voyage dans la Lune)',
    year: 1902,
    duration: '12m 52s',
    durationSeconds: 772,
    genres: ['Sci-Fi', 'Classics'],
    rating: 8.6,
    quality: 'Classic',
    description:
      'The foundational science fiction film in cinematic history by illusionist Georges Méliès. A guild of astronomers launch themselves to the Moon inside a giant cannon capsule.',
    director: 'Georges Méliès',
    cast: ['Georges Méliès', 'Bleuette Bernon', 'François Lallement'],
    videoUrl: 'https://archive.org/embed/Levoyagedanslalune',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain Pioneer (1902)',
    isFeatured: false,
    jsonFileName: 'movies/trip-to-the-moon.json',
    iframe: {
      src: 'https://archive.org/embed/Levoyagedanslalune',
      html: '<iframe src="https://archive.org/embed/Levoyagedanslalune" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'elephants-dream',
    title: 'Elephants Dream',
    year: 2006,
    duration: '10m 54s',
    durationSeconds: 654,
    genres: ['Animation', 'Sci-Fi'],
    rating: 7.9,
    quality: '1080p',
    description:
      'Elderly Proog guides younger Emo through an endless, labyrinthine machine of towering gears, wires, and impossible clockwork physics, but their perceptions of reality violently clash.',
    director: 'Bassam Kurdali',
    cast: ['Tygo Gernandt', 'Cas Jansen'],
    videoUrl: 'https://archive.org/embed/ElephantsDream',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    license: 'Creative Commons 2.5 (Orange Open Movie)',
    isFeatured: false,
    jsonFileName: 'movies/elephants-dream.json',
    iframe: {
      src: 'https://archive.org/embed/ElephantsDream',
      html: '<iframe src="https://archive.org/embed/ElephantsDream" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'nosferatu',
    title: 'Nosferatu: A Symphony of Horror',
    year: 1922,
    duration: '1h 34m',
    durationSeconds: 5640,
    genres: ['Horror & Mystery', 'Classics'],
    rating: 8.9,
    quality: 'Classic',
    description:
      'The seminal masterpiece of gothic cinema. Vampire Count Orlok expresses interest in a new residence and real estate agent Thomas Hutter’s wife in Germany.',
    director: 'F. W. Murnau',
    cast: ['Max Schreck', 'Gustav von Wangenheim', 'Greta Schröder'],
    videoUrl: 'https://archive.org/embed/Nosferatu_DVD_quality',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain (1922 Prana Film)',
    isFeatured: false,
    jsonFileName: 'movies/nosferatu.json',
    iframe: {
      src: 'https://archive.org/embed/Nosferatu_DVD_quality',
      html: '<iframe src="https://archive.org/embed/Nosferatu_DVD_quality" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
  {
    id: 'plan-9-from-outer-space',
    title: 'Plan 9 from Outer Space',
    year: 1957,
    duration: '1h 19m',
    durationSeconds: 4740,
    genres: ['Sci-Fi', 'Horror & Mystery', 'Classics'],
    rating: 7.4,
    quality: 'Classic',
    description:
      'Extraterrestrials implement Plan 9, a scheme to resurrect the earth’s dead to prevent humanity from creating a universe-destroying doomsday weapon.',
    director: 'Edward D. Wood Jr.',
    cast: ['Gregory Walcott', 'Mona McKinnon', 'Bela Lugosi', 'Vampira'],
    videoUrl: 'https://archive.org/embed/plan-9-from-outer-space',
    streamType: 'embed',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    license: 'Public Domain Cult Favorite',
    isFeatured: false,
    jsonFileName: 'movies/plan-9-from-outer-space.json',
    iframe: {
      src: 'https://archive.org/embed/plan-9-from-outer-space',
      html: '<iframe src="https://archive.org/embed/plan-9-from-outer-space" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: true,
      sandbox: 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  },
];

export const GENRES = [
  'All',
  'Sci-Fi',
  'Animation',
  'Horror & Mystery',
  'Action',
  'Comedy',
  'Classics',
  'Custom Streams',
  'Watchlist',
];

/**
 * Loads movie metadata dynamically from the public JSON files stored on the server.
 * If fetching fails, gracefully falls back to the embedded INITIAL_MOVIES dataset.
 */
export async function loadMoviesFromJsonFiles(): Promise<Movie[]> {
  try {
    const res = await fetch('/movies/index.json');
    if (!res.ok) throw new Error('Could not fetch /movies/index.json');
    const files: string[] = await res.json();
    const fetchedMovies = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = file.startsWith('/') ? file : `/${file}`;
          const movieRes = await fetch(filePath);
          if (!movieRes.ok) return null;
          const data = await movieRes.json();
          return {
            ...data,
            videoUrl: data.iframe?.src || data.videoUrl,
            jsonFileName: file,
          } as Movie;
        } catch {
          return null;
        }
      })
    );
    const valid = fetchedMovies.filter(Boolean) as Movie[];
    if (valid.length > 0) return valid;
  } catch (err) {
    console.warn('Falling back to built-in movie iframe dataset:', err);
  }
  return INITIAL_MOVIES;
}

/**
 * Generates formatted iframe JSON string for a given movie.
 */
export function formatMovieIframeJson(movie: Movie): string {
  const jsonDoc = {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    duration: movie.duration,
    durationSeconds: movie.durationSeconds,
    genres: movie.genres.filter((g) => g !== 'Custom Streams' && g !== 'Watchlist'),
    rating: movie.rating,
    quality: movie.quality,
    description: movie.description,
    director: movie.director,
    cast: movie.cast || [],
    posterUrl: movie.posterUrl,
    backdropUrl: movie.backdropUrl || movie.posterUrl,
    license: movie.license,
    isFeatured: movie.isFeatured || false,
    iframe: {
      src: movie.iframe?.src || movie.videoUrl,
      html:
        movie.iframe?.html ||
        `<iframe src="${movie.iframe?.src || movie.videoUrl}" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`,
      allow: movie.iframe?.allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      allowFullscreen: movie.iframe?.allowFullscreen ?? true,
      sandbox: movie.iframe?.sandbox || 'allow-scripts allow-same-origin allow-presentation allow-forms',
    },
  };
  return JSON.stringify(jsonDoc, null, 2);
}

/**
 * Downloads a movie as an iframe JSON file to the user's computer.
 */
export function downloadMovieJsonFile(movie: Movie): void {
  const jsonContent = formatMovieIframeJson(movie);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${movie.id || 'movie'}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
