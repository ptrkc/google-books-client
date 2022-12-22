import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BookPage } from './pages/BookPage'
import { ErrorPage } from './pages/ErrorPage'
import { HomePage } from './pages/HomePage'
import { MyBooksPage } from './pages/MyBooksPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/livro/:id',
    element: <BookPage />,
  },
  {
    path: '/meus-livros',
    element: <MyBooksPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
