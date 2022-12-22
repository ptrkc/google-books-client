import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
