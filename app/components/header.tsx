'use client'

import { useState, useEffect } from 'react'
import { useLocation } from "react-router"
import { Link } from "react-router"
import {
  Bars3Icon,
} from '@heroicons/react/24/outline'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (path: string) => {
  const isActive =
    path === '/'
      ? currentPath === '/'
      : currentPath.startsWith(path)

  return `relative text-sm font-semibold text-[#EEEEEE] group ${
    isActive ? 'text-red-500' : 'hover:text-red-500'
  }`
}

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex items-center lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img
              alt="FilmScape logo"
              src="/favicon.png"
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#F8EEDF]"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:gap-x-12 lg:justify-end">
          <Link to="/" className={linkClass('/')}>
            <span className={`relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:rounded-full after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full ${currentPath === '/' ? 'after:w-full' : 'after:w-0'}`}>
              Home
            </span>
          </Link>
              
          <Link to="/movies" className={linkClass('/movies')}>
            <span className={`relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:rounded-full after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full ${currentPath.startsWith('/movies') ? 'after:w-full' : 'after:w-0'}`}>
              Movies
            </span>
          </Link>
              
          <Link to="/tv" className={linkClass('/tv')}>
            <span className={`relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:rounded-full after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full ${currentPath.startsWith('/tv') ? 'after:w-full' : 'after:w-0'}`}>
              TV Series
            </span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

