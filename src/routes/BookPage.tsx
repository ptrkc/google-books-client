import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { BookCover } from '../components/BookCover'
import { BookResponse } from '../types/BookResponse'
import { fetchData } from '../utils/fetch'

const removeCommonHTMLTags = (text: string) => {
  const filtered = text.replace(
    /<i>|<\/i>|<p>|<\/p>|<br>|<ul>|<\/ul>|<\/li>|<b>|<\/b>/g,
    ''
  )
  return filtered.replace(/<li>/g, '• ')
}

const API_URL = `${import.meta.env.VITE_API_URL}`

export async function bookPageLoader({ params }: LoaderFunctionArgs) {
  const id = params.id
  if (id) {
    const data = await fetchData<BookResponse>(`${API_URL}volumes/${id}`)
    return data
  }
  return null
}

const BookInfo = ({ data }: { data: BookResponse }) => {
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
  const data = useLoaderData() as Awaited<ReturnType<typeof bookPageLoader>>

  return (
    <div className="flex flex-col justify-center items-center">
      {!data ? <p>No id</p> : <BookInfo data={data} />}
    </div>
  )
}
