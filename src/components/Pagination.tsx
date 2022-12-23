import { createSearchParams, useSearchParams } from 'react-router-dom'
import { StoreState, useStore } from '../hooks/useStore'
import { IconButton } from './IconButton'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons'

const limitSelector = (state: StoreState) => state.limit

export function Pagination({ itemCount }: { itemCount: number }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page'))
  const limit = useStore(limitSelector)
  const isAtEnd = itemCount < limit

  const changePage = (action: 'next' | 'prev') => {
    const newPage = String(action === 'next' ? page + 1 : page - 1)
    const params = createSearchParams({
      query: searchParams.get('query') ?? '',
      page: newPage,
      limit: String(limit),
    })
    setSearchParams(params)
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      <IconButton
        icon={<ArrowLeftIcon />}
        disabled={page === 1}
        onClick={() => changePage('prev')}
      />
      <span>Página {page}</span>
      <IconButton
        icon={<ArrowRightIcon />}
        disabled={isAtEnd}
        onClick={() => changePage('next')}
      />
    </div>
  )
}
