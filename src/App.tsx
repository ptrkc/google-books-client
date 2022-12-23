import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeSearch } from './components/HomeSearch'
import { BookPage, bookPageLoader } from './routes/BookPage'
import { ErrorPage } from './routes/ErrorPage'
import { HomePage } from './routes/HomePage'
import { FavoritesPage } from './routes/FavoritesPage'
import { SearchPage, searchPageLoader } from './routes/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeSearch /> },
      {
        path: 'buscar',
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
