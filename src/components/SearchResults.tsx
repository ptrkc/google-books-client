import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { BookSearchResponse } from '../types/BookSearchResponse'
import { BookCover } from './BookCover'

export const SearchResults = ({ query }: { query: string }) => {
  const { data, isLoading, error } = useApi<BookSearchResponse>({
    type: 'search',
    query,
  })

  if (error) return <p>{error}</p>

  if (isLoading) return <p>Buscando por &quot;{query}&quot;...</p>

  if (data && data.totalItems === 0) return <p>Nenhum resultado!</p>

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      {data?.items.map((item) => (
        <li
          key={item.id}
          className="bg-white flex border gap-2 p-2 hover:border-black "
        >
          <Link to={`/livro/${item.id}`}>
            <BookCover
              size="sm"
              imageLinks={item.volumeInfo.imageLinks}
              title={item.volumeInfo.title}
            />
          </Link>
          <div className="w-full flex flex-col justify-between">
            <div className="w-full">
              <p className="font-bold">{item.volumeInfo.title}</p>
              <p>
                {item.volumeInfo.authors?.length &&
                  `por ${item.volumeInfo.authors.join(', ')}`}
              </p>
              <p>
                {item.volumeInfo.averageRating ?? 0} (
                {item.volumeInfo.ratingsCount ?? 0})
              </p>
            </div>
            <div className="flex w-full justify-end items-end gap-2">
              <button className="font-bold rounded-md p-2 bg-yellow-500">
                Favoritar
              </button>
              <Link
                to={`/livro/${item.id}`}
                className="font-bold rounded-md p-2 bg-blue-500"
              >
                Informações
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
