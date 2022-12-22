import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeSearch } from './components/HomeSearch'
import { BookPage, bookPageLoader } from './pages/BookPage'
import { ErrorPage } from './pages/ErrorPage'
import { HomePage } from './pages/HomePage'
import { FavoritesPage } from './pages/FavoritesPage'
import { SearchPage, searchPageLoader } from './pages/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeSearch /> },
      {
        path: 'busca',
        loader: searchPageLoader,
        element: <SearchPage />,
      },
      {
        path: 'livro/:id',
        loader: bookPageLoader,
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
