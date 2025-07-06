import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { MediaGrid } from '../components/MediaGrid'
import { SearchFilters } from '../components/SearchFilters'
import { useNavigate } from 'react-router-dom'

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const query = searchParams.get('q') || ''
  const mediaType = searchParams.get('type') || 'all'
  const page = parseInt(searchParams.get('page') || '1')

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newQuery)}`)
    }
  }

  const handleFilterChange = (filters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    navigate(`/search?${params.toString()}`)
  }

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-star-white mb-6">
          Search the Universe
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Enter a search term to explore NASA's vast collection of space imagery
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for planets, galaxies, missions..."
            autoFocus
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-6">
        <div className="max-w-3xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for planets, galaxies, missions..."
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-star-white">
              Search results for "{query}"
            </h1>
            <p className="text-gray-400">
              Exploring NASA's image and video library
            </p>
          </div>

          <SearchFilters
            onFiltersChange={handleFilterChange}
            initialFilters={{ mediaType }}
          />
        </div>
      </div>

      {/* Results */}
      <MediaGrid query={query} mediaType={mediaType} page={page} />
    </div>
  )
}
