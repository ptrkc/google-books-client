import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Book } from '../types/Book'

type Limit = 10 | 20 | 30 | 40

export interface StoreState {
  limit: Limit
  favorites: Book[]
  setLimit: (limit: Limit) => void
  toggleFavorite: (item: Book) => void
}

export const useStore = create<StoreState>()(
  persist((set, get) => ({
    limit: 10,
    favorites: [],
    setLimit: (limit: Limit) => set({ limit }),
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
