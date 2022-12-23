import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useFavoriteStore } from '../hooks/useFavoriteStore'
import { Book } from '../types/Book'
import { BookCover } from './BookCover'

export const BookCard = ({ item }: { item: Book }) => {
  const { isFavorite, toggleFavorite } = useFavoriteStore(
    useCallback(
      (state) => ({
        toggleFavorite: state.toggleFavorite,
        isFavorite: state.favorites.find((fav) => fav.id === item.id),
      }),
      [item.id]
    )
  )
  return (
    <li className="bg-white flex border gap-2 p-2 w-full hover:border-gray-800 transition-[border] ">
      <Link to={`/livro/${item.id}`}>
        <BookCover
          size="sm"
          imageLinks={item.volumeInfo.imageLinks}
          title={item.volumeInfo.title}
        />
      </Link>
      <div className="w-full flex flex-col justify-between">
        <div className="w-full">
          <Link to={`/livro/${item.id}`}>
            <p className="font-bold hover:underline">{item.volumeInfo.title}</p>
          </Link>
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
          <button
            className="font-bold rounded-md p-2 bg-yellow-500"
            onClick={() => toggleFavorite(item)}
          >
            {isFavorite ? 'Remover' : 'Favoritar'}
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
  )
}
