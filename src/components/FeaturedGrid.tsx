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
    {
      id: 'mars-2',
      nasa_id: 'mars-2',
      title: 'Mars Surface Panorama',
      description: 'Incredible panoramic view from Mars Perseverance Rover',
      media_type: 'image' as const,
      date_created: '2023-02-20',
      thumbnail:
        'https://images-assets.nasa.gov/image/PIA24924/PIA24924~thumb.jpg',
      formattedDate: 'February 20, 2023',
      shortDescription:
        'Incredible panoramic view from Mars Perseverance Rover...',
      keywords: ['mars', 'rover', 'perseverance'],
    },
    {
      id: 'earth-3',
      nasa_id: 'earth-3',
      title: 'Earth from International Space Station',
      description: 'Beautiful view of Earth captured from the ISS',
      media_type: 'image' as const,
      date_created: '2023-03-10',
      thumbnail:
        'https://images-assets.nasa.gov/image/iss065e002899/iss065e002899~thumb.jpg',
      formattedDate: 'March 10, 2023',
      shortDescription: 'Beautiful view of Earth captured from the ISS...',
      keywords: ['earth', 'iss', 'space station'],
    },
    {
      id: 'apollo-4',
      nasa_id: 'apollo-4',
      title: 'Apollo 11 Moon Landing',
      description: 'Historic moment of the first human moon landing',
      media_type: 'image' as const,
      date_created: '1969-07-20',
      thumbnail:
        'https://images-assets.nasa.gov/image/as11-40-5875/as11-40-5875~thumb.jpg',
      formattedDate: 'July 20, 1969',
      shortDescription: 'Historic moment of the first human moon landing...',
      keywords: ['apollo', 'moon', 'landing'],
    },
    {
      id: 'saturn-5',
      nasa_id: 'saturn-5',
      title: 'Saturn and its Rings',
      description:
        'Cassini spacecraft image of Saturn and its magnificent rings',
      media_type: 'image' as const,
      date_created: '2023-04-15',
      thumbnail:
        'https://images-assets.nasa.gov/image/PIA21046/PIA21046~thumb.jpg',
      formattedDate: 'April 15, 2023',
      shortDescription:
        'Cassini spacecraft image of Saturn and its magnificent rings...',
      keywords: ['saturn', 'rings', 'cassini'],
    },
    {
      id: 'nebula-6',
      nasa_id: 'nebula-6',
      title: 'Crab Nebula',
      description: 'Stunning nebula captured by the Hubble Space Telescope',
      media_type: 'image' as const,
      date_created: '2023-05-08',
      thumbnail:
        'https://images-assets.nasa.gov/image/hubble-sees-the-crab-nebula/hubble-sees-the-crab-nebula~thumb.jpg',
      formattedDate: 'May 8, 2023',
      shortDescription:
        'Stunning nebula captured by the Hubble Space Telescope...',
      keywords: ['nebula', 'hubble', 'crab'],
    },
    {
      id: 'jupiter-7',
      nasa_id: 'jupiter-7',
      title: 'Jupiter Great Red Spot',
      description: "Close-up view of Jupiter's famous Great Red Spot storm",
      media_type: 'image' as const,
      date_created: '2023-06-12',
      thumbnail:
        'https://images-assets.nasa.gov/image/PIA21775/PIA21775~thumb.jpg',
      formattedDate: 'June 12, 2023',
      shortDescription:
        "Close-up view of Jupiter's famous Great Red Spot storm...",
      keywords: ['jupiter', 'great red spot', 'juno'],
    },
    {
      id: 'spacewalk-8',
      nasa_id: 'spacewalk-8',
      title: 'Astronaut Spacewalk',
      description: 'Astronaut performing maintenance outside the ISS',
      media_type: 'image' as const,
      date_created: '2023-07-01',
      thumbnail:
        'https://images-assets.nasa.gov/image/iss065e384451/iss065e384451~thumb.jpg',
      formattedDate: 'July 1, 2023',
      shortDescription: 'Astronaut performing maintenance outside the ISS...',
      keywords: ['spacewalk', 'astronaut', 'eva'],
    },
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
