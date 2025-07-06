import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const MediaDetailPage: React.FC = () => {
  const { nasaId } = useParams<{ nasaId: string }>()

  // Mock data - in real app this would use the useMediaDetails hook
  const loading = false
  const error = null
  const mediaItem = {
    nasa_id: nasaId,
    title: 'Hubble Captures a Galactic Waltz',
    description:
      'This stunning image from the NASA/ESA Hubble Space Telescope shows the galaxy NGC 1097, which lies about 45 million light-years away in the constellation of Fornax (The Furnace). NGC 1097 is a barred spiral galaxy, meaning it has a central bar-shaped structure made of stars.',
    media_type: 'image',
    date_created: '2023-01-15',
    formattedDate: 'January 15, 2023',
    keywords: ['hubble', 'galaxy', 'spiral', 'space telescope'],
    center: 'GSFC',
    photographer: 'NASA/ESA Hubble Space Telescope',
  }

  const assets = {
    original:
      'https://images-assets.nasa.gov/image/hubble-captures-a-galactic-waltz/hubble-captures-a-galactic-waltz~orig.jpg',
    large:
      'https://images-assets.nasa.gov/image/hubble-captures-a-galactic-waltz/hubble-captures-a-galactic-waltz~large.jpg',
    medium:
      'https://images-assets.nasa.gov/image/hubble-captures-a-galactic-waltz/hubble-captures-a-galactic-waltz~medium.jpg',
    small:
      'https://images-assets.nasa.gov/image/hubble-captures-a-galactic-waltz/hubble-captures-a-galactic-waltz~small.jpg',
    thumb:
      'https://images-assets.nasa.gov/image/hubble-captures-a-galactic-waltz/hubble-captures-a-galactic-waltz~thumb.jpg',
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12">
        <LoadingSpinner size="lg" className="mb-8" />
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
          <div className="aspect-video bg-gray-700 rounded" />
        </div>
      </div>
    )
  }

  if (error || !mediaItem) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="glass-card p-8 rounded-xl">
          <div className="text-6xl mb-4">🛸</div>
          <h1 className="text-2xl font-bold text-star-white mb-4">
            Media Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The requested media item could not be found in NASA's archives.
          </p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleDownload = (url: string, size: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `${mediaItem.nasa_id}-${size}.jpg`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center space-x-2 text-nebula-pink hover:text-purple-400 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Search</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-star-white mb-2">
              {mediaItem.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <span>📅 {mediaItem.formattedDate}</span>
              <span>🏢 {mediaItem.center}</span>
              {mediaItem.photographer && (
                <span>📸 {mediaItem.photographer}</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-nebula-pink bg-opacity-20 text-nebula-pink rounded-full text-sm font-medium">
              {mediaItem.media_type.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Keywords */}
        {mediaItem.keywords && mediaItem.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mediaItem.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-white bg-opacity-10 text-gray-300 rounded"
              >
                #{keyword}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media Display */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Media */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl overflow-hidden">
            {mediaItem.media_type === 'image' ? (
              <img
                src={assets.large || assets.medium || assets.original}
                alt={mediaItem.title}
                className="w-full h-auto"
                loading="lazy"
              />
            ) : mediaItem.media_type === 'video' ? (
              <video controls className="w-full h-auto" poster={assets.thumb}>
                <source src={assets.original} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <audio controls className="w-full">
                <source src={assets.original} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Description */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold text-star-white mb-4">
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {mediaItem.description}
            </p>
          </div>

          {/* Download Options */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold text-star-white mb-4">Download</h3>
            <div className="space-y-3">
              {Object.entries(assets).map(([size, url]) => (
                <button
                  key={size}
                  onClick={() => handleDownload(url, size)}
                  className="w-full flex items-center justify-between p-3 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <span className="text-star-white capitalize">{size}</span>
                  <svg
                    className="w-4 h-4 text-nebula-pink"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold text-star-white mb-4">Share</h3>
            <div className="flex space-x-3">
              <button className="flex-1 btn-secondary text-sm py-2">
                Copy Link
              </button>
              <button className="flex-1 btn-secondary text-sm py-2">
                Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
