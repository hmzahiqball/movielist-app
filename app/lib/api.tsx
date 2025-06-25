import axios from "axios";

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ...'; // potong biar ga kepanjangan

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
