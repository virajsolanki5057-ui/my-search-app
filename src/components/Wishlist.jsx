import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/context";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import Footer from "../components/footer";

export default function Wishlist() {
  const { wishlist } = useContext(MovieContext);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-white flex flex-col overflow-hidden">
      
      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_SX300.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="container mx-auto p-6 flex-grow">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            ← Back
          </button>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
            ❤️ My Wishlist
          </h1>

          {/* Empty Wishlist */}
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-20">
              <p className="text-gray-400 text-lg">
                No movies in your wishlist
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Start adding your favorite movies ❤️
              </p>
            </div>
          ) : (
            /* Wishlist Movies */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
