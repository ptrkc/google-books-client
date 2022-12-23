import { ReactNode } from 'react'
import { cn } from '../utils/classnames'
import { Spinner } from './Icons'

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: ReactNode
  isLoading?: boolean
  color?: keyof typeof colors
}

const colors = {
  default: 'text-white focus:ring-indigo-600 bg-indigo-500 hover:bg-indigo-600',
  red: 'text-black focus:ring-red-400 bg-red-300 hover:bg-red-400',
  yellow: 'text-black focus:ring-yellow-600 bg-yellow-500 hover:bg-yellow-600',
}

export function Button({
  children,
  onClick,
  className,
  icon,
  isLoading = false,
  disabled,
  color = 'default',
  ...rest
}: ButtonType) {
  const iconToShow = isLoading ? <Spinner /> : icon
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex justify-center items-center rounded-xl font-semibold px-4 py-1 shadow-lg  active:shadow-none active:scale-95 focus:ring-2  focus:ring-offset-2  transition-[filter]',
        !isLoading &&
          'disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed',
        iconToShow ? 'pl-2 pr-4' : 'px-6',
        colors[color],
        className
      )}
      disabled={disabled ?? isLoading}
      {...rest}
    >
      {iconToShow && <span className="w-5 h-5 ml-2 mr-2">{iconToShow}</span>}
      <span>{children}</span>
    </button>
  )
}
