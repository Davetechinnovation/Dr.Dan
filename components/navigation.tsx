'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-[#111413]/95 backdrop-blur-md border-b border-[#424844]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-[#e9c176] font-display text-lg md:text-xl font-semibold hover:text-[#b2f746] transition">
          Dr. Daniel Ochi
        </Link>

        {/* Desktop Menu - Reserved for future links */}
        <div className="hidden md:flex items-center gap-12">
        </div>

        {/* CTA Button + Mobile Menu */}
        <div className="flex items-center gap-4">
          <a href="#pricing">
            <button className="hidden md:block bg-[#e9c176] text-[#0a1410] px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#b2f746] transition cursor-pointer">
              Get the Book
            </button>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5"
          >
            <span className={`h-0.5 w-full bg-[#e9c176] transition ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-full bg-[#e9c176] transition ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-full bg-[#e9c176] transition ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1d201f] border-t border-[#424844] py-4 px-6 space-y-4">
          <a href="#pricing">
            <button onClick={() => setMobileMenuOpen(false)} className="w-full bg-[#e9c176] text-[#0a1410] px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#b2f746] transition cursor-pointer">
              Get the Book
            </button>
          </a>
        </div>
      )}
    </nav>
  )
}
