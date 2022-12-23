import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { SearchResults } from '../components/SearchResults'
import { useStore } from '../hooks/useStore'
import { BookSearchResponse } from '../types/BookSearchResponse'
import { fetchData } from '../utils/fetch'

const API_URL = `${import.meta.env.VITE_API_URL}`

export async function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')?.trim()
  const limit = useStore.getState().limit
  const startIndex = (Number(url.searchParams.get('page')) - 1) * limit
  if (query) {
    const data = await fetchData<BookSearchResponse>(
      `${API_URL}volumes?q=${query}&startIndex=${startIndex}&maxResults=${limit}`
    )
    return data
  }
  return null
}

export function SearchPage() {
  const data = useLoaderData() as Awaited<ReturnType<typeof searchPageLoader>>
  return (
    <div className="p-2 flex flex-col gap-2">
      <h2>🔍Buscar</h2>
      {data && <SearchResults data={data} />}
    </div>
  )
}
