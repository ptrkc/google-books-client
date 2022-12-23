import { BookGrid } from '../components/BookGrid'
import { StoreState, useStore } from '../hooks/useStore'

const favoritesSelector = (state: StoreState) => state.favorites
export function FavoritesPage() {
  const favorites = useStore(favoritesSelector)
  if (favorites.length === 0)
    return (
      <div className="p-2 flex flex-col gap-2">
        <h2>⭐Favoritos ({favorites.length})</h2>
        <p className="font-lg">
          Adicione livros aos seus favoritos para que eles apareçam aqui.
        </p>
      </div>
    )
  return <BookGrid items={favorites} />
}
