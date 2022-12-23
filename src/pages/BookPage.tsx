import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { BookCover } from '../components/BookCover'
import { useApi } from '../hooks/useApi'
import { BookResponse } from '../types/BookResponse'

export function bookPageLoader({ params }: LoaderFunctionArgs) {
  const id = params.id
  return { id }
}

const BookInfo = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useApi<BookResponse>({ type: 'book', id })

  if (error) return <p>{error}</p>

  if (isLoading) return <p>Buscando por &quot;{id}&quot;...</p>

  if (!data) return <p>Nenhum resultado!</p>

  return (
    <div>
      <BookCover
        size="lg"
        imageLinks={data.volumeInfo.imageLinks}
        title={data.volumeInfo.title}
      />
      <p>{data.volumeInfo.title}</p>
      <p>{data.volumeInfo.description}</p>
    </div>
  )
}

export function BookPage() {
  const { id } = useLoaderData() as ReturnType<typeof bookPageLoader>

  return (
    <div className="flex flex-col justify-center items-center">
      {!id ? <p>No id</p> : <BookInfo id={id} />}
    </div>
  )
}
