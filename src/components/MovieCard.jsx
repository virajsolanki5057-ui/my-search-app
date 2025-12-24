import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/context";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useContext(MovieContext);

  const isWishlisted = wishlist.some(m => m.imdbID === movie.imdbID);

  return (
    <div className="relative bg-gray-800 p-2 rounded hover:scale-105 transition cursor-pointer group">
      
      {/* Wishlist Button: visible only on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(movie);
        }}
        className="absolute top-2 right-2 text-red-500 text-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Movie Click */}
      <div onClick={() => navigate(`/movie/${movie.imdbID}`)}>
        {/* Poster */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          className="h-105 w-full object-cover rounded"
        />

        {/* Title */}
        <h3 className="mt-2 font-semibold text-white line-clamp-2 overflow-hidden text-ellipsis pr-2">
          {movie.Title}
        </h3>

        {/* Optional Description */}
        {movie.Plot && (
          <p className="mt-1 text-gray-300 text-sm line-clamp-2 overflow-hidden text-ellipsis">
            {movie.Plot}
          </p>
        )}
      </div>
    </div>
  );
}
