import { useApi } from '../hooks/useApi'
import { BookSearchResponse } from '../types/BookSearchResponse'
import { BookGrid } from './BookGrid'

export const SearchResults = ({ query }: { query: string }) => {
  const { data, isLoading, error } = useApi<BookSearchResponse>({
    type: 'search',
    query,
  })

  if (error) return <p>{error}</p>

  if (isLoading) return <p>Buscando por &quot;{query}&quot;...</p>

  if (data) return <BookGrid items={data.items} />

  return <p>Nenhum resultado!</p>
}
