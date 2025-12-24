const API_KEY = "f18c437c";

export const fetchMovies = async (query, page = 1) => {
  const res = await fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`);
  return res.json();
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
  return res.json();
};
