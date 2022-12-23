import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Book } from '../types/Book'

export interface FavoriteState {
  favorites: Book[]
  toggleFavorite: (item: Book) => void
}

export const useFavoriteStore = create<FavoriteState>()(
  persist((set, get) => ({
    favorites: [],
    toggleFavorite: (item: Book) => {
      const favorites = get().favorites
      if (favorites.find((fav) => fav.id === item.id)) {
        set({ favorites: [...favorites.filter((fav) => fav.id !== item.id)] })
      } else {
        set({ favorites: [...favorites, item] })
      }
    },
  }))
)
