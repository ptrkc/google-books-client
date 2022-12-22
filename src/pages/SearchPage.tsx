import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { SearchResults } from '../components/SearchResults'

export function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')
  return { query: query === null ? '' : query.trim() }
}

export function SearchPage() {
  const { query } = useLoaderData() as ReturnType<typeof searchPageLoader>

  return (
    <div className="flex flex-col justify-center items-center">
      {!query ? <p>No query</p> : <SearchResults query={query} />}
    </div>
  )
}
