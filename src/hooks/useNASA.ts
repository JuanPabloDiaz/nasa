import { useState, useEffect, useCallback } from 'react'
import type { ProcessedMediaItem, SearchParams } from '@/types/nasa.types'
import { nasaApiService } from '@/services/nasa.service'

interface UseNASASearchState {
  data: ProcessedMediaItem[]
  loading: boolean
  error: string | null
  hasMore: boolean
  currentPage: number
}

interface UseNASASearchReturn extends UseNASASearchState {
  search: (params: Omit<SearchParams, 'page'>) => Promise<void>
  loadMore: () => Promise<void>
  reset: () => void
}

export const useNASASearch = (): UseNASASearchReturn => {
  const [state, setState] = useState<UseNASASearchState>({
    data: [],
    loading: false,
    error: null,
    hasMore: false,
    currentPage: 1,
  })

  const [lastSearchParams, setLastSearchParams] = useState<Omit<SearchParams, 'page'> | null>(null)

  const search = useCallback(async (params: Omit<SearchParams, 'page'>) => {
    setState(prev => ({ ...prev, loading: true, error: null, currentPage: 1 }))
    setLastSearchParams(params)

    try {
      const results = await nasaApiService.search({
        ...params,
        page: 1,
        page_size: 20,
      })

      setState(prev => ({
        ...prev,
        data: results,
        loading: false,
        hasMore: results.length === 20,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to search NASA media',
      }))
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (!lastSearchParams || state.loading || !state.hasMore) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const results = await nasaApiService.search({
        ...lastSearchParams,
        page: state.currentPage + 1,
        page_size: 20,
      })

      setState(prev => ({
        ...prev,
        data: [...prev.data, ...results],
        loading: false,
        hasMore: results.length === 20,
        currentPage: prev.currentPage + 1,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load more results',
      }))
    }
  }, [lastSearchParams, state.loading, state.hasMore, state.currentPage])

  const reset = useCallback(() => {
    setState({
      data: [],
      loading: false,
      error: null,
      hasMore: false,
      currentPage: 1,
    })
    setLastSearchParams(null)
  }, [])

  return {
    ...state,
    search,
    loadMore,
    reset,
  }
}

// Hook for getting media details
interface UseMediaDetailsState {
  loading: boolean
  error: string | null
  assets: any
  metadata: any
  captions: string
}

export const useMediaDetails = (nasaId: string | undefined) => {
  const [state, setState] = useState<UseMediaDetailsState>({
    loading: false,
    error: null,
    assets: null,
    metadata: null,
    captions: '',
  })

  useEffect(() => {
    if (!nasaId) return

    const fetchDetails = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }))

      try {
        const [assets, metadata, captions] = await Promise.allSettled([
          nasaApiService.getAssets(nasaId),
          nasaApiService.getMetadata(nasaId),
          nasaApiService.getCaptions(nasaId),
        ])

        setState(prev => ({
          ...prev,
          loading: false,
          assets: assets.status === 'fulfilled' ? assets.value : null,
          metadata: metadata.status === 'fulfilled' ? metadata.value : null,
          captions: captions.status === 'fulfilled' ? captions.value : '',
        }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch media details',
        }))
      }
    }

    fetchDetails()
  }, [nasaId])

  return state
}

// Hook for featured content
export const useFeaturedContent = () => {
  const [state, setState] = useState<{
    data: ProcessedMediaItem[]
    loading: boolean
    error: string | null
  }>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const results = await nasaApiService.getFeaturedContent()
        setState({ data: results, loading: false, error: null })
      } catch (error) {
        setState({
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch featured content',
        })
      }
    }

    fetchFeatured()
  }, [])

  return state
}
