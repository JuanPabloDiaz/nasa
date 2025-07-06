import React, { useEffect, useState } from 'react'
import { MediaCard } from './MediaCard'
import { LoadingSpinner, LoadingCard } from './LoadingSpinner'

interface MediaGridProps {
  query: string
  mediaType?: string
  page?: number
}

interface MediaItem {
  id: string
  nasa_id: string
  title: string
  description?: string
  media_type: 'image' | 'video' | 'audio'
  date_created: string
  thumbnail?: string
  formattedDate: string
  shortDescription: string
  keywords?: string[]
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  query,
  mediaType = 'all',
  page = 1,
}) => {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  // Mock data for demonstration
  useEffect(() => {
    setLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      const mockData: MediaItem[] = [
        {
          id: `${query}-1`,
          nasa_id: `${query}-1`,
          title: `${query} - Image 1`,
          description: `A beautiful view of ${query}`,
          media_type: 'image',
          date_created: '2023-01-15',
          thumbnail:
            'https://images-assets.nasa.gov/image/hubble-captures-a-galactic-waltz/hubble-captures-a-galactic-waltz~thumb.jpg',
          formattedDate: 'January 15, 2023',
          shortDescription: `A beautiful view of ${query}...`,
          keywords: [query.toLowerCase()],
        },
        // Add more mock items
      ]

      setItems(mockData)
      setTotalResults(mockData.length)
      setHasMore(false)
      setLoading(false)
    }, 1000)
  }, [query, mediaType, page])

  const loadMoreCards = Array.from({ length: 8 }, (_, i) => (
    <LoadingCard key={`loading-${i}`} />
  ))

  if (loading && items.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400 mt-4">Searching the cosmos...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loadMoreCards}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass-card p-8 rounded-xl max-w-md mx-auto">
          <div className="text-6xl mb-4">🚀💥</div>
          <h3 className="text-xl font-bold text-star-white mb-2">
            Houston, we have a problem!
          </h3>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="glass-card p-8 rounded-xl max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍🌌</div>
          <h3 className="text-xl font-bold text-star-white mb-2">
            No results found
          </h3>
          <p className="text-gray-400 mb-6">
            We couldn't find any content matching "{query}". Try a different
            search term.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['hubble', 'mars', 'earth', 'apollo', 'jupiter'].map(term => (
                <span key={term} className="px-2 py-1 bg-gray-700 rounded">
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Showing {items.length} of {totalResults} results
        </span>
        {hasMore && <span>Page {page}</span>}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <MediaCard
            key={item.id}
            item={item}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}

        {loading && loadMoreCards}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center pt-8">
          <button
            className="btn-secondary"
            onClick={() => {
              // Handle load more
            }}
          >
            Load More Results
          </button>
        </div>
      )}
    </div>
  )
}
