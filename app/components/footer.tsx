'use client'

import { Link } from 'react-router'

export function Footer() {
  return (
    <footer
      className="bg-cover bg-center text-white py-16"
      style={{ backgroundImage: "url('/footer-bg.webp')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-10">
          <img
            src="/favicon.png"
            alt="tMovies Logo"
            className="h-20"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 text-sm font-medium text-gray-200">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/terms">Term Of Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/live">Live</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/premium">Premium</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/must-watch">You Must Watch</Link>
          <Link to="/recent-release">Recent Release</Link>
          <Link to="/top-imdb">Top IMDB</Link>
        </div>
      </div>
    </footer>
  )
}
