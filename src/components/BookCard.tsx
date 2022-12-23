import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useFavoriteStore } from '../hooks/useFavoriteStore'
import { Book } from '../types/Book'
import { BookCover } from './BookCover'
import { Button } from './Button'

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
          <Button
            color={isFavorite ? 'red' : 'yellow'}
            onClick={() => toggleFavorite(item)}
          >
            {isFavorite ? 'Remover' : 'Favoritar'}
          </Button>
          <Link
            to={`/livro/${item.id}`}
            className="flex justify-center items-center rounded-xl font-semibold px-4 py-1 shadow-lg text-white active:shadow-none active:scale-95 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 bg-indigo-500 transition-[filter] hover:bg-indigo-600"
          >
            Informações
          </Link>
        </div>
      </div>
    </li>
  )
}
