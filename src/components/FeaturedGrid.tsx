import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { MediaCard } from './MediaCard'

interface FeaturedGridProps {
  className?: string
}

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({
  className = '',
}) => {
  // Mock featured content for now - this would come from the NASA API hook
  const featuredItems = [
    {
      id: 'hubble-1',
      nasa_id: 'hubble-1',
      title: 'Hubble Deep Field',
      description: 'A stunning view into the deep universe',
      media_type: 'image' as const,
      date_created: '2023-01-15',
      thumbnail:
        'https://images-assets.nasa.gov/image/hubble-captures-a-galactic-waltz/hubble-captures-a-galactic-waltz~thumb.jpg',
      formattedDate: 'January 15, 2023',
      shortDescription: 'A stunning view into the deep universe...',
      keywords: ['hubble', 'deep field', 'galaxies'],
    },
    // Add more mock items as needed
  ]

  const isLoading = false // This would come from the hook
  const error = null // This would come from the hook

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <p className="text-red-400 text-lg mb-4">
            Failed to load featured content
          </p>
          <button
            className="btn-secondary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredItems.map(item => (
          <MediaCard key={item.id} item={item} className="animate-fade-in" />
        ))}
      </div>

      {featuredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No featured content available</p>
        </div>
      )}
    </div>
  )
}
