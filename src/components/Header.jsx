import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-gray-900 z-10 shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="FlickTrack Logo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <h1 className="text-2xl font-bold text-white">FlickTrack</h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center text-white">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link
              to="/wishlist"
              className="hover:text-red-400 transition flex items-center gap-1"
            >
              Wishlist ❤️
            </Link>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Mobile Links */}
        <nav className="flex flex-col gap-6 p-6">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-lg hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setOpen(false)}
            className="text-lg hover:text-red-400 transition"
          >
            Wishlist ❤️
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
