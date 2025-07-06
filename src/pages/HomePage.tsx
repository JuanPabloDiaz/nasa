import React from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { FeaturedGrid } from '../components/FeaturedGrid'
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 animate-fade-in">
            Explore the Universe
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-slide-up">
            Discover breathtaking images and videos from NASA's vast collection of space exploration media
          </p>
          
          {/* Hero Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for planets, galaxies, missions..."
              autoFocus
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleSearch('hubble')}
              className="btn-secondary"
            >
              🔭 Hubble Images
            </button>
            <button 
              onClick={() => handleSearch('mars')}
              className="btn-secondary"
            >
              🔴 Mars Exploration
            </button>
            <button 
              onClick={() => handleSearch('earth')}
              className="btn-secondary"
            >
              🌍 Earth from Space
            </button>
            <button 
              onClick={() => handleSearch('apollo')}
              className="btn-secondary"
            >
              🚀 Apollo Missions
            </button>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-star-white">Featured Content</h2>
          <Link 
            to="/search?q=featured" 
            className="text-nebula-pink hover:text-purple-400 transition-colors"
          >
            View all →
          </Link>
        </div>
        <FeaturedGrid />
      </section>

      {/* About Section */}
      <section className="glass-card p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-star-white mb-4">
            About NASA Space Archive
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Dive into the cosmos with NASA's incredible collection of space imagery and videos. 
            From stunning Hubble telescope photographs to Mars rover discoveries, explore the 
            universe through the eyes of humanity's greatest space exploration achievements.
          </p>
          <div className="mt-6">
            <a 
              href="https://images.nasa.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Visit Official NASA Images</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
