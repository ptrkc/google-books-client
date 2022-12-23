import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
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
  const { volumeInfo } = data
  const description =
    (volumeInfo.description && removeCommonHTMLTags(volumeInfo.description)) ||
    'Sem descrição.'

  return (
    <div className="flex flex-col sm:flex-row p-2 gap-4">
      <div className="grow-0 shrink-0">
        <BookCover
          size="lg"
          imageLinks={volumeInfo.imageLinks}
          title={volumeInfo.title}
        />
      </div>
      <div>
        <h2>{volumeInfo.title}</h2>
        <p className="pb-4">
          <span>Autores: </span>
          {volumeInfo.authors?.length &&
            volumeInfo.authors.map((author, index) => (
              <Link
                className="underline text-indigo-700"
                key={author}
                to={`/buscar?query=inauthor:${author}`}
              >
                {author}
                {index + 1 < volumeInfo.authors?.length && ',  '}
              </Link>
            ))}
          <p>
            <span>Editora: </span>
            {volumeInfo.publisher && (
              <Link
                className="underline text-indigo-700"
                key={volumeInfo.publisher}
                to={`/buscar?query=inpublisher:${volumeInfo.publisher}`}
              >
                {volumeInfo.publisher}{' '}
              </Link>
            )}{' '}
          </p>
          <p>
            <span>Publicação: </span>
            {volumeInfo.publishedDate}
          </p>
        </p>
        <p>{description}</p>
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
