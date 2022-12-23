import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { BookCover } from '../components/BookCover'
import { useApi } from '../hooks/useApi'
import { BookResponse } from '../types/BookResponse'

const removeCommonHTMLTags = (text: string) => {
  const filtered = text.replace(
    /<i>|<\/i>|<p>|<\/p>|<br>|<ul>|<\/ul>|<\/li>|<b>|<\/b>/g,
    ''
  )
  return filtered.replace(/<li>/g, '• ')
}

export function bookPageLoader({ params }: LoaderFunctionArgs) {
  const id = params.id
  return { id }
}

const BookInfo = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useApi<BookResponse>({ type: 'book', id })

  if (error) return <p>{error}</p>

  if (isLoading) return <p>Buscando por &quot;{id}&quot;...</p>

  if (!data) return <p>Nenhum resultado!</p>

  const description =
    (data.volumeInfo.description &&
      removeCommonHTMLTags(data.volumeInfo.description)) ||
    'Sem descrição.'
  return (
    <div className="flex flex-col sm:flex-row p-2 gap-4">
      <div className="grow-0 shrink-0">
        <BookCover
          size="lg"
          imageLinks={data.volumeInfo.imageLinks}
          title={data.volumeInfo.title}
        />
      </div>
      <div>
        <h2>{data.volumeInfo.title}</h2>
        <p className="pb-4">
          {data.volumeInfo.authors.length &&
            `por ${data.volumeInfo.authors.join(', ')}`}{' '}
          | {data.volumeInfo.publisher} | {data.volumeInfo.publishedDate}
        </p>
        <div>{description}</div>
      </div>
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
