export interface NASAMediaItem {
  nasa_id: string
  title: string
  description?: string
  keywords?: string[]
  date_created: string
  media_type: 'image' | 'video' | 'audio'
  center?: string
  photographer?: string
  location?: string
}

export interface NASACollection {
  version: string
  href: string
  items: {
    href: string
    data: NASAMediaItem[]
    links?: {
      href: string
      rel: string
      render?: string
    }[]
  }[]
  metadata: {
    total_hits: number
  }
  links?: {
    href: string
    rel: string
    prompt?: string
  }[]
}

export interface NASASearchResponse {
  collection: NASACollection
}

export interface NASAAssetResponse {
  collection: {
    version: string
    href: string
    items: {
      href: string
    }[]
  }
}

export interface NASAMetadataResponse {
  [key: string]: string | number | string[]
}

export interface SearchFilters {
  mediaType?: 'image' | 'video' | 'audio' | 'all'
  yearStart?: string
  yearEnd?: string
  center?: string
}

export interface SearchParams {
  q: string
  media_type?: string
  year_start?: string
  year_end?: string
  center?: string
  page?: number
  page_size?: number
}

export interface MediaAsset {
  original?: string
  large?: string
  medium?: string
  small?: string
  thumb?: string
  preview?: string
  captions?: string
}

export interface ProcessedMediaItem extends NASAMediaItem {
  id: string
  thumbnail?: string
  assets?: MediaAsset
  formattedDate: string
  shortDescription: string
}
