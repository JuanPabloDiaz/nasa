import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchBar } from './SearchBar'

export const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="glass-card border-b border-white border-opacity-10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nebula-pink to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">🚀</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">
                NASA Space Archive
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">
                Explore the cosmos through imagery
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg w-full">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-star-white hover:text-nebula-pink transition-colors px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              Home
            </Link>
            <a 
              href="https://images.nasa.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-star-white hover:text-nebula-pink transition-colors px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              NASA Images
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
