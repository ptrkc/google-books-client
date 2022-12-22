import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  return { q }
}

export function SearchPage() {
  const { q } = useLoaderData() as ReturnType<typeof loader>

  return (
    <div>
      <div>Buscando por &quot;{q}&quot;!</div>
      <div>results</div>
    </div>
  )
}
