import { useState, ChangeEventHandler } from 'react'
import { Form } from 'react-router-dom'

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
  return (
    <Form action="/busca">
      <input
        className="border"
        onChange={handleInputChange}
        value={searchText}
        name="query"
      />
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
