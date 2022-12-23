import { ScrollRestoration } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function HomePage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col mx-auto max-w-6xl">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  )
}
