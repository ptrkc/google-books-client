import { useState, useEffect } from 'react'

const API_URL = `${import.meta.env.VITE_API_URL}/volumes?q=`

interface BookSearchType {
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

interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

interface ApiConfiguration {
  query: string
}

export const useApi = ({ query }: ApiConfiguration) => {
  const [data, setData] = useState<BookSearchType>({ items: [] })
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${API_URL}${query}`)
        const response = await fetch(`${API_URL}${query}`)
        const json = (await response.json()) as BookSearchType
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

    fetchData().catch(() => setError(true))
  }, [])

  return { data, isLoading, error }
}
