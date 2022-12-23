import { BookSearchResponse } from '../types/BookSearchResponse'
import { BookGrid } from './BookGrid'

export const SearchResults = ({ data }: { data: BookSearchResponse }) => {
  return <BookGrid items={data.items} />
}
