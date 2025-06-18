'use client'

import { useState, useEffect } from 'react'
import {
  Bars3Icon,
} from '@heroicons/react/24/outline'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10) // bisa lo ubah threshold-nya
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent'
  }`}
>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto text-[#F8EEDF]"
            />
          </a>
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
          <a href="#" className="text-sm/6 font-semibold text-[#EEEEEE]">
            Home
          </a>
          <a href="#" className="text-sm/6 font-semibold text-[#EEEEEE]">
            Movies
          </a>
          <a href="#" className="text-sm/6 font-semibold text-[#EEEEEE]">
            TV Series
          </a>
        </div>
      </nav>
    </header>
  )
}
