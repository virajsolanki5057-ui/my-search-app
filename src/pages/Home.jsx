import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/footer";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/context";

import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

const API_KEY = "f18c437c";
const DEFAULT_QUERY = "Dil";

const categories = [
  "Bollywood",
  "Hollywood",
  "Batman",
  "Spider-Man",
  "Horror",
  "Comedy",
  "Action",
  "Sci-Fi"
];

export default function Home() {
  const { search, setSearch } = useContext(MovieContext);

  const [movies, setMovies] = useState([]);
  const [uiPage, setUiPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Debounced search value
  const debouncedSearch = useDebounce(search, 600);

  // Fetch movies (2 OMDb pages per UI page)
  const fetchMovies = async (query, page = 1) => {
    try {
      setLoading(true);

      const apiPage1 = page * 2 - 1;
      const apiPage2 = page * 2;

      const [res1, res2] = await Promise.all([
        axios.get(`https://www.omdbapi.com/?s=${query}&page=${apiPage1}&apikey=${API_KEY}`),
        axios.get(`https://www.omdbapi.com/?s=${query}&page=${apiPage2}&apikey=${API_KEY}`)
      ]);

      let combinedMovies = [];
      if (res1.data.Response === "True") combinedMovies = combinedMovies.concat(res1.data.Search);
      if (res2.data.Response === "True") combinedMovies = combinedMovies.concat(res2.data.Search);

      if (combinedMovies.length > 0) {
        setMovies(combinedMovies);
        setError("");
      } else {
        setMovies([]);
        setError("No movies found");
      }
    } catch {
      setMovies([]);
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Use DEBOUNCED value here
  useEffect(() => {
    const query = debouncedSearch.trim() || DEFAULT_QUERY;
    fetchMovies(query, uiPage);
  }, [debouncedSearch, uiPage]);

  // Category click
  const handleCategoryClick = (cat) => {
    setSearch(cat);
    setUiPage(1);
  };

  // ✅ THROTTLED pagination
  const nextPage = useThrottle(() => {
    setUiPage((p) => p + 1);
  }, 800);

  const prevPage = useThrottle(() => {
    setUiPage((p) => Math.max(1, p - 1));
  }, 800);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      {/* Search */}
      <div className="container mx-auto p-4 sm:p-6 flex flex-col gap-4">
        <div className="relative w-full max-w-lg mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setUiPage(1);
            }}
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            🔍
          </div>
        </div>

        {/* Categories (mobile slider) */}
        <div className="flex gap-3 overflow-x-auto py-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Movies */}
      <div className="container mx-auto p-6 flex-grow">
        {loading && <p className="text-center text-gray-400">Loading movies...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        {movies.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevPage}
              disabled={uiPage === 1}
              className="px-4 py-2 bg-gray-700 rounded-full disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2 bg-gray-800 rounded-full">
              Page {uiPage}
            </span>

            <button
              onClick={nextPage}
              className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
