import { useState, ChangeEventHandler } from 'react'
import { Form, useNavigation } from 'react-router-dom'
import { Button } from './Button'
import { SearchIcon } from './Icons'

const useSearchBar = () => {
  const [searchText, setSearchText] = useState('')

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchText(event.target.value)
  }

  return { searchText, handleInputChange }
}

const SearchInput = ({
  searchText,
  handleInputChange,
}: {
  searchText: string
  handleInputChange: ChangeEventHandler<HTMLInputElement>
}) => {
  const navigation = useNavigation()
  return (
    <Form
      action="/busca"
      className="flex flex-col justify-center items-center gap-4"
    >
      <input
        className="border p-2 text-lg rounded"
        onChange={handleInputChange}
        value={searchText}
        name="query"
        placeholder="O Senhor dos Anéis"
      />
      <Button icon={<SearchIcon />} isLoading={navigation.state === 'loading'}>
        Buscar Livro
      </Button>
    </Form>
  )
}

export function HomeSearch() {
  const { searchText, handleInputChange } = useSearchBar()

  return (
    <div className="pt-32 flex flex-col justify-center items-center p-2 gap-5">
      <h1 className="text-center">📚BuscaLivros</h1>
      <p className="text-center font-lg">
        Escreva o nome ou algo relacionado ao livro que você está buscando.
      </p>
      <SearchInput
        searchText={searchText}
        handleInputChange={handleInputChange}
      />
    </div>
  )
}
