import { Book } from '../types/Book'
import { BookCard } from './BookCard'

export const BookGrid = ({ items }: { items: Book[] }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      {items.map((item) => (
        <BookCard key={`${item.id}`} item={item} />
      ))}
    </ul>
  )
}
