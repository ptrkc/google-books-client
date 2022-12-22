import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { searchPageLoader } from '../pages/SearchPage'
import { BookCover } from './BookCover'

export const SearchResults = ({
  query,
}: ReturnType<typeof searchPageLoader>) => {
  const { data, isLoading, error } = useApi({ query })

  if (error) return <p>{error}</p>

  if (isLoading) return <p>Buscando por &quot;{query}&quot;...</p>

  if (data.totalItems === 0) return <p>Nenhum resultado!</p>

  return (
    <ul className="flex flex-col gap-2 p-2">
      {data.items.map((item) => (
        <li key={item.id}>
          <Link
            to={`/livro/${item.id}`}
            className="flex border gap-2 p-2 hover:border-black "
          >
            <BookCover
              imageLinks={item.volumeInfo.imageLinks}
              title={item.volumeInfo.title}
            />
            <div>
              <p className="font-bold">{item.volumeInfo.title}</p>
              <p className="line-clamp-6">{item.volumeInfo.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
