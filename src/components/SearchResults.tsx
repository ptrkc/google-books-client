import { BookSearchResponse } from '../types/BookSearchResponse'
import { BookGrid } from './BookGrid'
import { Pagination } from './Pagination'

export const SearchResults = ({ data }: { data: BookSearchResponse }) => {
  if (!data.items) return <p className="pt-20 text-center">Nenhum resultado</p>

  return (
    <div>
      <BookGrid items={data.items} />
      <Pagination itemCount={data.items.length} />
    </div>
  )
}
