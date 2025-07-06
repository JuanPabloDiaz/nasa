import type {
  NASASearchResponse,
  NASAAssetResponse,
  NASAMetadataResponse,
  SearchParams,
  ProcessedMediaItem,
  MediaAsset,
} from '../types/nasa.types'

const BASE_URL =
  import.meta.env.VITE_NASA_API_BASE_URL || 'https://images-api.nasa.gov'

class NASAApiService {
  private async makeRequest<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(endpoint, BASE_URL)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.append(key, value)
        }
      })
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(
        `NASA API request failed: ${response.status} ${response.statusText}`
      )
    }

    return response.json()
  }

  async search(searchParams: SearchParams): Promise<ProcessedMediaItem[]> {
    const params: Record<string, string> = {
      q: searchParams.q,
    }

    if (searchParams.media_type && searchParams.media_type !== 'all') {
      params.media_type = searchParams.media_type
    }

    if (searchParams.year_start) {
      params.year_start = searchParams.year_start
    }

    if (searchParams.year_end) {
      params.year_end = searchParams.year_end
    }

    if (searchParams.center) {
      params.center = searchParams.center
    }

    if (searchParams.page) {
      params.page = searchParams.page.toString()
    }

    if (searchParams.page_size) {
      params.page_size = searchParams.page_size.toString()
    }

    const response = await this.makeRequest<NASASearchResponse>(
      '/search',
      params
    )

    return response.collection.items.map(item => this.processMediaItem(item))
  }

  async getAssets(nasaId: string): Promise<MediaAsset> {
    const response = await this.makeRequest<NASAAssetResponse>(
      `/asset/${nasaId}`
    )

    const assets: MediaAsset = {}

    // Process asset URLs to categorize by size/type
    response.collection.items.forEach(item => {
      const href = item.href.toLowerCase()

      if (href.includes('orig')) {
        assets.original = item.href
      } else if (href.includes('large')) {
        assets.large = item.href
      } else if (href.includes('medium')) {
        assets.medium = item.href
      } else if (href.includes('small')) {
        assets.small = item.href
      } else if (href.includes('thumb')) {
        assets.thumb = item.href
      } else if (href.includes('preview')) {
        assets.preview = item.href
      } else if (href.includes('.srt') || href.includes('captions')) {
        assets.captions = item.href
      }
    })

    return assets
  }

  async getMetadata(nasaId: string): Promise<NASAMetadataResponse> {
    return this.makeRequest<NASAMetadataResponse>(`/metadata/${nasaId}`)
  }

  async getCaptions(nasaId: string): Promise<string> {
    try {
      const response = await this.makeRequest<any>(`/captions/${nasaId}`)
      return response
    } catch (error) {
      console.warn(`No captions found for ${nasaId}`)
      return ''
    }
  }

  private processMediaItem(item: any): ProcessedMediaItem {
    const data = item.data[0]
    const thumbnail = item.links?.[0]?.href

    return {
      ...data,
      id: data.nasa_id,
      thumbnail,
      formattedDate: this.formatDate(data.date_created),
      shortDescription: this.truncateDescription(data.description || '', 150),
    }
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  private truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) {
      return description
    }

    const truncated = description.slice(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')

    return lastSpace > 0
      ? truncated.slice(0, lastSpace) + '...'
      : truncated + '...'
  }

  // Utility method to get trending/featured searches
  async getFeaturedContent(): Promise<ProcessedMediaItem[]> {
    const featuredQueries = [
      'hubble',
      'mars',
      'earth',
      'international space station',
      'apollo',
    ]

    const randomQuery =
      featuredQueries[Math.floor(Math.random() * featuredQueries.length)]

    return this.search({
      q: randomQuery,
      page_size: 12,
      media_type: 'image',
    })
  }

  // Method to get popular search suggestions
  getSearchSuggestions(): string[] {
    return [
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
      'spacewalk',
      'lunar surface',
      'solar system',
      'black hole',
      'space shuttle',
    ]
  }
}

export const nasaApiService = new NASAApiService()
export default nasaApiService
