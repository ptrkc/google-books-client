import { PropsWithChildren } from 'react'
import { NavLink as BaseNavLink } from 'react-router-dom'
import { cn } from '../utils/classnames'

const NavLink = ({ to, children }: PropsWithChildren<{ to: string }>) => {
  return (
    <BaseNavLink
      className={({ isActive }) =>
        cn('text-white font-bold text-lg', isActive ? 'underline' : undefined)
      }
      to={to}
    >
      {children}
    </BaseNavLink>
  )
}

export function Header() {
  return (
    <header className="bg-indigo-500">
      <nav className="mx-auto max-w-lg flex justify-between items-center p-2 ">
        <NavLink to="/">📚Home</NavLink>
        <NavLink to="/favoritos">⭐Favoritos</NavLink>
        <NavLink to="/buscar">🔍Buscar</NavLink>
      </nav>
    </header>
  )
}
