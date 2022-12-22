import { useParams } from 'react-router-dom'

export function BookPage() {
  const { id } = useParams()
  return <div>Pagina do livro com id &quot;{id}&quot;!</div>
}
