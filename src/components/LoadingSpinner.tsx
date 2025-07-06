import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size]}`} />
    </div>
  )
}

export const LoadingCard: React.FC = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-2 bg-gray-700 rounded" />
          <div className="h-2 bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    </div>
  )
}
