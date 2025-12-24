import { FaFacebook, FaGithub, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-transparent text-white mt-10">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="FlickTrack Logo" className="w-10 h-10 object-cover rounded-full" />
            <span className="text-2xl font-bold">FlickTrack</span>
          </div>
          <p className="text-gray-400 mt-2 max-w-xs">
            Your go-to movie search platform for Hollywood, Bollywood & Web Series.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <p className="hover:text-blue-400 cursor-pointer">Terms & Conditions</p>
            <p className="hover:text-blue-400 cursor-pointer">Privacy Policy</p>
            <p className="hover:text-blue-400 cursor-pointer">Refund Policy</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Social Media</h4>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"><FaFacebook /> Facebook</p>
              <p className="flex items-center gap-2 hover:text-pink-500 cursor-pointer"><FaYoutube /> Youtube</p>
              <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaLinkedin /> Linkedin</p>
              <p className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"><FaTwitter /> Twitter</p>
              <p className="flex items-center gap-2 hover:text-gray-400 cursor-pointer"><FaGithub /> Github</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Job Info</h4>
            <p className="hover:text-blue-400 cursor-pointer">Select</p>
            <p className="hover:text-blue-400 cursor-pointer">Service</p>
            <p className="hover:text-blue-400 cursor-pointer">Payment</p>
            <p className="hover:text-blue-400 cursor-pointer">Language</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm text-gray-400">
        Copyright © FlickTrack, All rights reserved
      </div>
    </footer>
  );
}
