import axios from "axios";

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTc4MmE2YzdhMzIwZDJhMDRmODIxOGU3NTMwNTkxMiIsIm5iZiI6MTc1MDA2MjcyNi44OTEsInN1YiI6IjY4NGZkNjg2ZjllNzJiNGY0OWIwZTk5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g5e7DJgUiRiL9rgV7Vng6jrt7T6aUrEERKouc_FvtJI';

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: AUTH_TOKEN,
  },
});

// Movies & TV Home Data
export const fetchHomeData = async () => {
  const [
    nowPlaying,
    popular,
    topRated,
    upcoming,
    airingToday,
    onTheAir,
    trending,
    topRatedTv,
  ] = await Promise.all([
    api.get("/movie/now_playing?language=en-US&page=1"),
    api.get("/movie/popular?language=en-US&page=1"),
    api.get("/movie/top_rated?language=en-US&page=1"),
    api.get("/movie/upcoming?language=en-US&page=1"),
    api.get("/tv/airing_today?language=en-US&page=1"),
    api.get("/tv/on_the_air?language=en-US&page=1"),
    api.get("/tv/popular?language=en-US&page=1"),
    api.get("/tv/top_rated?language=en-US&page=1"),
  ]);

  return {
    nowPlaying: nowPlaying.data.results,
    trendingMovies: popular.data.results,
    topRatedMovies: topRated.data.results,
    upcomingMovies: upcoming.data.results,
    airingTodaySeries: airingToday.data.results,
    onTheAirSeries: onTheAir.data.results,
    trendingSeries: trending.data.results,
    topRatedSeries: topRatedTv.data.results,
  };
};

// Movie Categories
export const fetchMoviesByCategory = async (
  category: "now_playing" | "popular" | "top_rated" | "upcoming",
  page = 1
) => {
  const res = await api.get(`/movie/${category}?language=en-US&page=${page}`);
  return {
    movies: res.data.results,
    totalPages: res.data.total_pages,
  };
};

// Movie genres
export const fetchMovieGenres = async (): Promise<Record<number, string>> => {
  const res = await api.get("/genre/movie/list?language=en");
  const genreMap: Record<number, string> = {};
  res.data.genres.forEach((g: any) => {
    genreMap[g.id] = g.name;
  });
  return genreMap;
};

// TV Categories
export const fetchTvByCategory = async (
  category: "airing_today" | "on_the_air" | "popular" | "top_rated",
  page = 1
) => {
  const res = await api.get(`/tv/${category}?language=en-US&page=${page}`);
  return {
    movies: res.data.results,
    totalPages: res.data.total_pages,
  };
};

// TV genres
export const fetchTvGenres = async (): Promise<Record<number, string>> => {
  const res = await api.get("/genre/tv/list?language=en");
  const genreMap: Record<number, string> = {};
  res.data.genres.forEach((g: any) => {
    genreMap[g.id] = g.name;
  });
  return genreMap;
};

// Fetch movie by ID
export const fetchMovieById = async (id: string) => {
  try {
    const res = await api.get(`/movie/${id}?language=en-US`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch movie detail:', err);
    throw err;
  }
};

// Fetch series by ID
export const fetchTvById = async (id: string) => {
  try {
    const res = await api.get(`/tv/${id}?language=en-US`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch series detail:', err);
    throw err;
  }
};

// Fetch movie cast by ID
export const fetchMovieCastById = async (id: string) => {
  try {
    const res = await api.get(`/movie/${id}/credits?language=en-US`);
    return res.data.cast;
  } catch (err) {
    console.error('Failed to fetch movie cast:', err);
    throw err;
  }
}

// Fetch series cast by ID
export const fetchTvCastById = async (id: string) => {
  try {
    const res = await api.get(`/tv/${id}/credits?language=en-US`);
    return res.data.cast;
  } catch (err) {
    console.error('Failed to fetch series cast:', err);
    throw err;
  }
}

// Fetch movie video by ID
export const fetchMovieVideoById = async (id: string) => {
  try {
    const res = await api.get(`/movie/${id}/videos?language=en-US`);
    return res.data.results;
  } catch (err) {
    console.error('Failed to fetch movie videos:', err);
    throw err;
  }
}

// Fetch movie recomandation by ID
export const fetchMovieReviewsById = async (id: string, page: string) => {
  try {
    const res = await api.get(`/movie/${id}/reviews?language=en-US&page=${page}`);
    return res.data.results;
  } catch (err) {
    console.error('Failed to fetch movie reviews:', err);
    throw err;
  }
}

// Fetch movie recomandation by ID
export const fetchRecomendationMovieDetail = async (id: string, page: string) => {
  try {
    const res = await api.get(`/movie/${id}/recommendations?language=en-US&page=${page}`);
    return res.data.results;
  } catch (err) {
    console.error('Failed to fetch movie recommendations:', err);
    throw err;
  }
}

// Fetch movie recomandation by ID
export const fetchSimilarMovieDetail = async (id: string, page: string) => {
  try {
    const res = await api.get(`/movie/${id}/similar?language=en-US&page=${page}`);
    return res.data.results;
  } catch (err) {
    console.error('Failed to fetch similar movie :', err);
    throw err;
  }
}

// Fetch movie recomandation by ID
export const fetchMovieKeywordById = async (id: string) => {
  try {
    const res = await api.get(`/movie/${id}/keywords`);
    return res.data.results;
  } catch (err) {
    console.error('Failed to fetch similar movie :', err);
    throw err;
  }
}