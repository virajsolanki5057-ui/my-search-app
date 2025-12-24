import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  const toggleWishlist = (movie) => {
    setWishlist(prev => {
      const exists = prev.find(m => m.imdbID === movie.imdbID);
      if (exists) return prev.filter(m => m.imdbID !== movie.imdbID);
      return [...prev, movie];
    });
  };

  return (
    <MovieContext.Provider value={{
      allMovies,
      setAllMovies,
      wishlist,
      toggleWishlist,
      search,
      setSearch
    }}>
      {children}
    </MovieContext.Provider>
  );
};
