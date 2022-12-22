import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { BookType, useApi } from '../hooks/useApi'

export function bookPageLoader({ params }: LoaderFunctionArgs) {
  const id = params.id
  return { id }
}

const BookInfo = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useApi<BookType>({ type: 'book', id })

  if (error) return <p>{error}</p>

  if (isLoading) return <p>Buscando por &quot;{id}&quot;...</p>

  if (!data) return <p>Nenhum resultado!</p>

  return (
    <div>
      <img src={data.volumeInfo.imageLinks.large} alt={data.volumeInfo.title} />
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
