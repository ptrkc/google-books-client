import { useState, useEffect } from 'react'

const API_URL = `${import.meta.env.VITE_API_URL}`

interface SearchConfig {
  type: 'search'
  query: string
  id?: never
}

interface BookConfig {
  type: 'book'
  id: string
  query?: never
}
type ApiConfig = SearchConfig | BookConfig

export const useApi = <T>(config: ApiConfig) => {
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
