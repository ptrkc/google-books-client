import { BookSearchResponse } from '../types/BookSearchResponse'
import { BookGrid } from './BookGrid'
import { Pagination } from './Pagination'

export const SearchResults = ({ data }: { data: BookSearchResponse }) => {
  if (data.totalItems === 0) return <p>no results</p>

  return (
    <div>
      <BookGrid items={data.items} />
      <Pagination itemCount={data.totalItems} />
    </div>
  )
}
