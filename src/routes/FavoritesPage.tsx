import { BookGrid } from '../components/BookGrid'
import { FavoriteState, useFavoriteStore } from '../hooks/useFavoriteStore'

const favoritesSelector = (state: FavoriteState) => state.favorites
export function FavoritesPage() {
  const favorites = useFavoriteStore(favoritesSelector)
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
