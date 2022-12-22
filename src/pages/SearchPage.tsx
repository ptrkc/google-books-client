import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'

export function loader({ request }: LoaderFunctionArgs) {
  console.log(request)
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  return { q }
}

export function SearchPage() {
  const { q } = useLoaderData() as ReturnType<typeof loader>

  return <div>Buscando por &quot;{q}&quot;!</div>
}
