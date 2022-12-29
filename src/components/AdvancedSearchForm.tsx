import { Form, useNavigation, useSearchParams } from 'react-router-dom'
import { StoreState, useStore } from '../hooks/useStore'
import { Button } from './Button'
import { SearchIcon } from './Icons'

const limitSelector = (state: StoreState) => state.limit
export const AdvancedSearchForm = () => {
  const [searchParams] = useSearchParams()
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
          defaultValue={searchParams.get('query') ?? ''}
        />
      </label>
      <label className="flex flex-col">
        Autor(a):
        <input
          className="border p-2 text-lg rounded"
          name="author"
          placeholder="Tolkien"
          defaultValue={searchParams.get('author') ?? ''}
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
