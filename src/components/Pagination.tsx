import { createSearchParams, useSearchParams } from 'react-router-dom'
import { StoreState, useStore } from '../hooks/useStore'
import { IconButton } from './IconButton'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons'

const limitSelector = (state: StoreState) => state.limit

export function Pagination({ itemCount }: { itemCount: number }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page'))
  const isAtEnd = itemCount < useStore(limitSelector)

  const changePage = (action: 'next' | 'prev') => {
    const newParams = createSearchParams(searchParams)
    newParams.set('page', String(action === 'next' ? page + 1 : page - 1))
    setSearchParams(newParams)
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
