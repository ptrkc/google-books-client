import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import { Button } from '../components/Button'
import { SearchIcon } from '../components/Icons'
import { SearchResults } from '../components/SearchResults'
import { Limit, StoreState, useStore } from '../hooks/useStore'
import { BookSearchResponse } from '../types/BookSearchResponse'
import { fetchData } from '../utils/fetch'

const API_URL = `${import.meta.env.VITE_API_URL}`

export async function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')?.trim()
  const author = url.searchParams.get('author')?.trim()
  const searchLimit = Number(url.searchParams.get('limit'))
  if (searchLimit) useStore.setState({ limit: searchLimit as Limit })
  const limit = searchLimit || useStore.getState().limit
  const page = Number(url.searchParams.get('page'))
  const startIndex = page === 0 ? 0 : (page - 1) * limit
  if (query || author) {
    const queryData = query ?? ''
    const authorData = author ? `inauthor:${author}}` : ''
    const data = await fetchData<BookSearchResponse>(
      `${API_URL}volumes?q=${queryData}${authorData}&startIndex=${startIndex}&maxResults=${limit}`
    )
    return data
  }
  return null
}

export function SearchPage() {
  const data = useLoaderData() as Awaited<ReturnType<typeof searchPageLoader>>
  return (
    <div className="p-2 flex flex-col gap-2">
      <h2>🔍Buscar</h2>
      <AdvancedSearch />
      {data && <SearchResults data={data} />}
    </div>
  )
}

const limitSelector = (state: StoreState) => state.limit
const AdvancedSearch = () => {
  const limit = useStore(limitSelector)
  const navigation = useNavigation()

  return (
    <Form
      action="/buscar"
      className="flex flex-col lg:flex-row justify-center lg:items-end gap-4 p-4 m-2 bg-white border"
    >
      <label className="flex flex-col">
        Título:
        <input
          className="border p-2 text-lg rounded"
          name="query"
          placeholder="O Senhor dos Anéis"
          required={false}
        />
      </label>
      <label className="flex flex-col">
        Autor(a):
        <input
          className="border p-2 text-lg rounded"
          name="author"
          placeholder="Tolkien"
          required={false}
        />
      </label>
      <label className="flex flex-col">
        Livros por página
        <select
          className="border p-2 text-lg rounded bg-white h-[2.9rem]"
          name="limit"
          defaultValue={limit}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
      </label>
      <input hidden type="search" name="page" defaultValue={1} />
      <Button
        className="h-12"
        icon={<SearchIcon />}
        isLoading={navigation.state === 'loading'}
      >
        Buscar Livro
      </Button>
    </Form>
  )
}
