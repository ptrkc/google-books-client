import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeSearch } from './components/HomeSearch'
import { BookPage } from './pages/BookPage'
import { ErrorPage } from './pages/ErrorPage'
import { HomePage } from './pages/HomePage'
import { FavoritesPage } from './pages/FavoritesPage'
import { loader as searchLoader, SearchPage } from './pages/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeSearch /> },
      {
        path: 'busca',
        loader: searchLoader,
        element: <SearchPage />,
      },
      {
        path: 'livro/:id',
        element: <BookPage />,
      },
      {
        path: 'favoritos',
        element: <FavoritesPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
