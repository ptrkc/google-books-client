import { Form, useNavigation } from 'react-router-dom'
import { StoreState, useStore } from '../hooks/useStore'
import { Button } from './Button'
import { SearchIcon } from './Icons'

const limitSelector = (state: StoreState) => state.limit

const SearchInput = () => {
  const limit = useStore(limitSelector)
  const navigation = useNavigation()

  return (
    <Form
      action="/buscar"
      className="flex flex-col justify-center items-center gap-4"
    >
      <input
        className="border p-2 text-lg rounded"
        name="query"
        placeholder="O Senhor dos Anéis"
      />
      <input hidden type="search" name="page" defaultValue={1} />
      <input hidden type="search" name="limit" defaultValue={limit} />
      <Button icon={<SearchIcon />} isLoading={navigation.state === 'loading'}>
        Buscar Livro
      </Button>
    </Form>
  )
}

export function HomeSearch() {
  return (
    <div className="pt-32 flex flex-col justify-center items-center p-2 gap-5">
      <h1 className="text-center">📚BuscaLivros</h1>
      <p className="text-center font-lg">
        Escreva o nome ou algo relacionado ao livro que você está buscando.
      </p>
      <SearchInput />
    </div>
  )
}
