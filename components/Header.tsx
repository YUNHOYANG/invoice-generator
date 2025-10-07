'use client'

import { useState } from 'react'

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
              threppa.net
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </a>
            <a href="/guide" className="text-gray-700 hover:text-blue-600 transition">
              Guide
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <a href="/about" className="block text-gray-700 hover:text-blue-600 transition">
              About
            </a>
            <a href="/guide" className="block text-gray-700 hover:text-blue-600 transition">
              Guide
            </a>
            <a href="/contact" className="block text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
