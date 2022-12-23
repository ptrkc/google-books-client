import { LoaderFunctionArgs, Navigate, useLoaderData } from 'react-router-dom'
import { SearchResults } from '../components/SearchResults'
import { BookSearchResponse } from '../types/BookSearchResponse'
import { fetchData } from '../utils/fetch'

const API_URL = `${import.meta.env.VITE_API_URL}`

export async function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')
  if (query?.trim()) {
    const data = await fetchData<BookSearchResponse>(
      `${API_URL}volumes?q=${query}`
    )
    return data
  }
  return null
}

export function SearchPage() {
  const data = useLoaderData() as Awaited<ReturnType<typeof searchPageLoader>>

  return !data ? <Navigate to={'/'} /> : <SearchResults data={data} />
}
