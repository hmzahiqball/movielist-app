'use client'

import { Link } from 'react-router'

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

        <div style={{ width: '50vw', margin: '0 auto', padding: '0 2rem' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-1 text-md text-gray-200 leading-tight">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/terms" className="hover:underline">Term Of Services</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/live" className="hover:underline">Live</Link>
          <Link to="/faq" className="hover:underline">FAQ</Link>
          <Link to="/premium" className="hover:underline">Premium</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/must-watch" className="hover:underline">You Must Watch</Link>
          <Link to="/recent-release" className="hover:underline">Recent Release</Link>
          <Link to="/top-imdb" className="hover:underline">Top IMDB</Link>
          <Link to="/genre" className="hover:underline">Genre</Link>
        </div>
      </div>
    </footer>
  )
}
