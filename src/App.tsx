import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SimpleSearchForm } from './components/SimpleSearchForm'
import { BookPage, bookPageLoader } from './routes/BookPage'
import { ErrorPage } from './routes/ErrorPage'
import { Layout } from './routes/Layout'
import { FavoritesPage } from './routes/FavoritesPage'
import { SearchPage, searchPageLoader } from './routes/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SimpleSearchForm /> },
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
