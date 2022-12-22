import { useState, useEffect } from 'react'

const API_URL = `${import.meta.env.VITE_API_URL}`

export interface BookSearchType {
  totalItems?: number
  items: Item[]
}

interface Item {
  id: string
  volumeInfo: VolumeInfo
}

interface VolumeInfo {
  title: string
  authors: string[]
  description?: string
  pageCount: number
  categories?: string[]
  imageLinks?: ImageLinks
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

interface SearchConfig {
  type: 'search'
  query: string
  id?: never
}

export interface BookType {
  id: string
  etag: string
  selfLink: string
  volumeInfo: BookVolumeInfo
}

interface BookVolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  pageCount: number
  printedPageCount: number
  imageLinks: BookImageLinks
}

interface BookImageLinks {
  smallThumbnail: string
  thumbnail: string
  small: string
  medium: string
  large: string
  extraLarge: string
}

interface BookConfig {
  type: 'book'
  id: string
  query?: never
}
type ApiConfiguration = SearchConfig | BookConfig

export const useApi = <T>(config: ApiConfiguration) => {
  const { type } = config
  let params: string
  if (type === 'search') {
    params = `?q=${config.query}`
  }
  if (type === 'book') {
    params = `/${config.id}`
  }
  const [data, setData] = useState<T | null>()
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${API_URL}${params}`)
        const response = await fetch(`${API_URL}${params}`)
        const json = (await response.json()) as T
        if (response.status >= 200 && response.status <= 299) {
          setData(json)
        } else {
          console.log({ response })
          console.log({ json })
          throw Error()
        }
      } catch (err) {
        console.log({ err })
        throw Error()
      }

      setIsLoading(false)
    }

    if (config.id || config.query) {
      fetchData().catch(() => setError(true))
    } else {
      setError(true)
    }
  }, [])

  return { data, isLoading, error }
}
