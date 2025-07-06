import React, { useState, useRef } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search the cosmos...',
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = [
    'hubble telescope',
    'mars rover',
    'earth from space',
    'apollo missions',
    'international space station',
    'saturn',
    'jupiter',
    'nebula',
    'galaxy',
    'astronaut',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setIsExpanded(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSearch(suggestion)
    setIsExpanded(false)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="input-cosmic w-full pl-12 pr-4 py-3 text-lg"
            aria-label="Search NASA media"
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Search Suggestions */}
        {isExpanded && query === '' && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-card border border-white border-opacity-20 rounded-xl overflow-hidden z-50">
            <div className="p-3 border-b border-white border-opacity-10">
              <h3 className="text-sm font-medium text-gray-300">
                Popular searches
              </h3>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-white hover:bg-opacity-10 transition-colors border-b border-white border-opacity-5 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-star-white">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
