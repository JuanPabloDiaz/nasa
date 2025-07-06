import React from 'react'
import { Link } from 'react-router-dom'

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

interface MediaCardProps {
  item: MediaItem
  className?: string
  style?: React.CSSProperties
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  className = '',
  style,
}) => {
  const getMediaTypeIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'video':
        return '📹'
      case 'audio':
        return '🎵'
      default:
        return '🖼️'
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    // Prevent infinite loop by checking if we're already using the placeholder
    if (!target.src.includes('placeholder-space.svg')) {
      target.src = '/placeholder-space.svg'
    }
  }

  return (
    <Link
      to={`/media/${item.nasa_id}`}
      className={`group block ${className}`}
      style={style}
    >
      <article className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full">
        {/* Image/Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-space-blue to-cosmic-purple flex items-center justify-center">
              <span className="text-4xl opacity-50">
                {getMediaTypeIcon(item.media_type)}
              </span>
            </div>
          )}

          {/* Media Type Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-medium bg-black bg-opacity-60 text-white rounded-full">
              {getMediaTypeIcon(item.media_type)}{' '}
              {item.media_type.toUpperCase()}
            </span>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-star-white text-lg mb-2 line-clamp-2 group-hover:text-nebula-pink transition-colors">
            {item.title}
          </h3>

          <p className="text-gray-400 text-sm mb-3 line-clamp-3">
            {item.shortDescription}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{item.formattedDate}</span>
            {item.keywords && item.keywords.length > 0 && (
              <span className="truncate ml-2">#{item.keywords[0]}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
