import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { useApi } from '../hooks/useApi'

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')
  return { query: query === null ? '' : query.trim() }
}

const SearchResults = ({ query }: ReturnType<typeof loader>) => {
  const { data, isLoading, error } = useApi({ query })

  if (error) return <p>{error}</p>

  if (isLoading) return <p>Buscando por &quot;{query}&quot;...</p>

  if (data.totalItems === 0) return <p>Nenhum resultado!</p>

  return (
    <ul>
      {data.items.map((item) => (
        <li key={item.id}>{item.volumeInfo.title}</li>
      ))}
    </ul>
  )
}

export function SearchPage() {
  const { query } = useLoaderData() as ReturnType<typeof loader>

  return (
    <div className="flex flex-col justify-center items-center">
      {!query ? <p>No query</p> : <SearchResults query={query} />}
    </div>
  )
}
