import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <div className="text-8xl animate-float">🛸</div>
          <h1 className="text-6xl font-bold text-gradient">404</h1>
          <h2 className="text-2xl font-semibold text-star-white">
            Houston, we have a problem!
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            The page you're looking for seems to have drifted into deep space. 
            Let's get you back to exploring the cosmos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            🚀 Return to Home
          </Link>
          <Link to="/search?q=hubble" className="btn-secondary">
            🔍 Search Hubble Images
          </Link>
        </div>

        <div className="glass-card p-6 rounded-xl max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-star-white mb-3">
            Popular destinations:
          </h3>
          <div className="space-y-2">
            <Link 
              to="/search?q=mars" 
              className="block text-nebula-pink hover:text-purple-400 transition-colors"
            >
              🔴 Mars exploration
            </Link>
            <Link 
              to="/search?q=earth" 
              className="block text-nebula-pink hover:text-purple-400 transition-colors"
            >
              🌍 Earth from space
            </Link>
            <Link 
              to="/search?q=apollo" 
              className="block text-nebula-pink hover:text-purple-400 transition-colors"
            >
              🌙 Apollo missions
            </Link>
            <Link 
              to="/search?q=galaxy" 
              className="block text-nebula-pink hover:text-purple-400 transition-colors"
            >
              🌌 Distant galaxies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
