'use client'

import { Link } from 'react-router' // fix: pakai react-router-dom

export function Footer() {
  return (
    <footer
      className="bg-cover bg-center text-white py-12"
      style={{ backgroundImage: "url('/footer-bg.webp')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/favicon.png"
            alt="tMovies Logo"
            className="h-16"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center text-gray-200 text-sm max-w-4xl mx-auto">
          {/* Explore Movies */}
          <div>
            <h1 className="font-bold mb-2">🎬 Explore Movies</h1>
            <ul className="space-y-1">
              <li><Link to={`/movies?filter=now_playing`} className="hover:underline">Playing Now</Link></li>
              <li><Link to={`/movies?filter=popular`} className="hover:underline">Trending</Link></li>
              <li><Link to={`/movies?filter=top_rated`} className="hover:underline">Top Rated TMDB</Link></li>
              <li><Link to={`/movies?filter=upcoming`} className="hover:underline">Upcoming</Link></li>
            </ul>
          </div>

          {/* Explore Series */}
          <div>
            <h1 className="font-bold mb-2">📺 Explore Series</h1>
            <ul className="space-y-1">
              <li><Link to={`/tv?filter=airing_today`} className="hover:underline">Airing Today</Link></li>
              <li><Link to={`/tv?filter=on_the_air`} className="hover:underline">On The Air</Link></li>
              <li><Link to={`/tv?filter=popular`} className="hover:underline">Trending Now</Link></li>
              <li><Link to={`/tv?filter=top_rated`} className="hover:underline">Top Rated TMDB</Link></li>
            </ul>
          </div>

          {/* General Info */}
          <div>
            <h1 className="font-bold mb-2">📚 Information</h1>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/about" className="hover:underline">FAQ</Link></li>
              <li><Link to="/about" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm text-gray-400">
        © {new Date().getFullYear()} FilmScape. All rights reserved.
      </div>
    </footer>
  )
}
