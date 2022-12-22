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
        name="q"
      />
    </Form>
  )
}

export function Header() {
  const { searchText, handleInputChange } = useSearchBar()

  return (
    <div className="flex justify-center items-center bg-blue-300 p-2">
      <SearchInput
        searchText={searchText}
        handleInputChange={handleInputChange}
      />
    </div>
  )
}
