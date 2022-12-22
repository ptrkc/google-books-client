import { PropsWithChildren } from 'react'
import { NavLink as BaseNavLink } from 'react-router-dom'

const NavLink = ({ to, children }: PropsWithChildren<{ to: string }>) => {
  return (
    <BaseNavLink
      className={({ isActive }) => (isActive ? 'underline' : undefined)}
      to={to}
    >
      {children}
    </BaseNavLink>
  )
}

export function Header() {
  return (
    <header className="bg-blue-300">
      <nav className="mx-auto max-w-lg flex justify-between items-center p-2 ">
        <NavLink to="/">📚Home</NavLink>
        <NavLink to="/favoritos">⭐Favoritos</NavLink>
        <NavLink to="/busca">🔍Busca</NavLink>
      </nav>
    </header>
  )
}
