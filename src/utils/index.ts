// Utility functions for the NASA Space Archive app

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = src
  })
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const result = document.execCommand('copy')
      document.body.removeChild(textArea)
      return result
    }
  } catch {
    return false
  }
}

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 0
    ? truncated.slice(0, lastSpace) + '...'
    : truncated + '...'
}

export const parseSearchQuery = (
  query: string
): { terms: string[]; filters: Record<string, string> } => {
  const terms: string[] = []
  const filters: Record<string, string> = {}

  // Simple parser for search queries with filters like "mars type:image year:2020"
  const parts = query.split(/\s+/)

  parts.forEach(part => {
    if (part.includes(':')) {
      const [key, value] = part.split(':')
      if (key && value) {
        filters[key.toLowerCase()] = value
      }
    } else if (part.trim()) {
      terms.push(part)
    }
  })

  return { terms, filters }
}

export const formatDate = (
  dateString: string,
  format: 'short' | 'long' | 'relative' = 'long'
): string => {
  try {
    const date = new Date(dateString)

    switch (format) {
      case 'short':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

      case 'relative': {
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) return 'Yesterday'
        if (diffDays < 7) return `${diffDays} days ago`
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
        return `${Math.ceil(diffDays / 365)} years ago`
      }

      default:
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
    }
  } catch {
    return dateString
  }
}

export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

export const getMediaType = (
  url: string
): 'image' | 'video' | 'audio' | 'unknown' => {
  const extension = url.split('.').pop()?.toLowerCase()

  if (!extension) return 'unknown'

  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'svg',
    'bmp',
    'tiff',
  ]
  const videoExtensions = [
    'mp4',
    'webm',
    'ogg',
    'avi',
    'mov',
    'wmv',
    'flv',
    'm4v',
  ]
  const audioExtensions = ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a']

  if (imageExtensions.includes(extension)) return 'image'
  if (videoExtensions.includes(extension)) return 'video'
  if (audioExtensions.includes(extension)) return 'audio'

  return 'unknown'
}

// Local storage utilities
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  },

  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  },
}

// Session storage utilities
export const sessionStorage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to sessionStorage:', error)
    }
  },

  remove: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from sessionStorage:', error)
    }
  },
}
