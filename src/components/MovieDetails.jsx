import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/api";
import Header from "../components/Header";
import Footer from "../components/footer";

export default function MovieDetails() {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(imdbID);
      setMovie(data);
    };
    loadMovie();
  }, [imdbID]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      {/* Hero Section */}
<div className="relative min-h-[70vh] sm:min-h-[60vh] w-full overflow-hidden">

  {/* Background Poster */}
  <div
    className="absolute inset-0 w-full h-full bg-center bg-cover"
    style={{
      backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"})`,
      filter: "brightness(0.7) saturate(0.999)", // dark overlay via CSS
    }}
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

  {/* Hero Content */}
  <div className="relative z-10 h-full flex items-end px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">

      {/* Poster */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-50 sm:w-52 md:w-70 rounded-xl shadow-2xl md:-mb-5 object-cover"
      />

      {/* Movie Info */}
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-11">
          {movie.Title}
        </h1>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 text- sm:text-lg text-gray-300 mb-5">
          <span>{movie.Year}</span>
          <span>{movie.Runtime}</span>
          <span>{movie.Rated}</span>
        </div>

        <p className="text-gray-300 text-s sm:text-base leading-relaxed">
          {movie.Plot}
        </p>

        {/* Rating */}
        <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
          <span className="text-yellow-400 text-2xl sm:text-3xl">⭐</span>
          <span className="text-xl sm:text-2xl font-bold">{movie.imdbRating}</span>
          <span className="text-gray-400 text-sm">/ 10 IMDb</span>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Main Info */}
        <div className="md:col-span-2 space-y-4">
          <Info label="Director" value={movie.Director} />
          <Info label="Actors" value={movie.Actors} />
          <Info label="Language" value={movie.Language} />
          <Info label="Genre" value={movie.Genre} />
        </div>

        {/* Side Card */}
        <div className="bg-gray-900 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Movie Info</h3>
          <Info label="Released" value={movie.Released} />
          <Info label="Box Office" value={movie.BoxOffice} />
          <Info label="Awards" value={movie.Awards} />
        </div>
      </div>

      <Footer />  
    </div>
  );
}

const Info = ({ label, value }) => (
  <p className="text-sm sm:text-base text-gray-300">
    <span className="text-gray-400 font-medium">{label}:</span>{" "}
    {value || "N/A"}
  </p>
);
