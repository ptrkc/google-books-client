import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <div className="text-center pt-40 text-2xl">
      <p>Desculpe, mas não encontramos essa página.</p>
      Voltar para{' '}
      <Link to="/" className="text-indigo-500 underline text-2xl">
        home
      </Link>
      ?
    </div>
  )
}
