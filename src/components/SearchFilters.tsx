import React from 'react'

interface FilterOption {
  value: string
  label: string
}

interface SearchFiltersProps {
  onFiltersChange: (filters: Record<string, string>) => void
  initialFilters?: Record<string, string>
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onFiltersChange, 
  initialFilters = {} 
}) => {
  const mediaTypeOptions: FilterOption[] = [
    { value: 'all', label: 'All Media' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
  ]

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...initialFilters,
      [key]: value
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Media Type Filter */}
      <div className="flex items-center space-x-2">
        <label htmlFor="media-type" className="text-sm font-medium text-gray-300">
          Type:
        </label>
        <select
          id="media-type"
          value={initialFilters.mediaType || 'all'}
          onChange={(e) => handleFilterChange('mediaType', e.target.value)}
          className="bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg px-3 py-2 text-star-white text-sm focus:outline-none focus:ring-2 focus:ring-nebula-pink"
        >
          {mediaTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Year Filter */}
      <div className="flex items-center space-x-2">
        <label htmlFor="year" className="text-sm font-medium text-gray-300">
          Year:
        </label>
        <select
          id="year"
          value={initialFilters.year || 'all'}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg px-3 py-2 text-star-white text-sm focus:outline-none focus:ring-2 focus:ring-nebula-pink"
        >
          <option value="all">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>

      {/* Clear Filters */}
      {Object.values(initialFilters).some(value => value && value !== 'all') && (
        <button
          onClick={() => onFiltersChange({})}
          className="text-sm text-nebula-pink hover:text-purple-400 transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
