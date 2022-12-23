import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { AdvancedSearchForm } from '../components/AdvancedSearchForm'
import { SearchResults } from '../components/SearchResults'
import { Limit, useStore } from '../hooks/useStore'
import { BookSearchResponse } from '../types/BookSearchResponse'
import { fetchData } from '../utils/fetch'

const API_URL = `${import.meta.env.VITE_API_URL}`

export async function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')?.trim()
  const author = url.searchParams.get('author')?.trim()
  const searchLimit = Number(url.searchParams.get('limit'))
  if (searchLimit) useStore.setState({ limit: searchLimit as Limit })
  const limit = searchLimit || useStore.getState().limit
  const page = Number(url.searchParams.get('page'))
  const startIndex = page === 0 ? 0 : (page - 1) * limit
  if (query || author) {
    const queryData = query ?? ''
    const authorData = author ? `inauthor:${author}}` : ''
    const data = await fetchData<BookSearchResponse>(
      `${API_URL}volumes?q=${queryData}${authorData}&startIndex=${startIndex}&maxResults=${limit}`
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
      <AdvancedSearchForm />
      {data && <SearchResults data={data} />}
    </div>
  )
}
