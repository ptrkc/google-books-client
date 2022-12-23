import { ReactNode } from 'react'
import { cn } from '../utils/classnames'

type IconButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: ReactNode; color?: keyof typeof colors }

const colors = {
  default: 'text-white focus:ring-indigo-600 bg-indigo-500 hover:bg-indigo-600',
  gray: 'text-black focus:ring-gray-400 bg-gray-300 hover:bg-gray-400',
  yellow: 'text-black focus:ring-yellow-600 bg-yellow-500 hover:bg-yellow-600',
}

export function IconButton({
  icon,
  onClick,
  className,
  color = 'default',
  ...rest
}: IconButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-8 h-8 p-[6px] shadow-lg flex justify-center items-center rounded-full font-bold ',
        colors[color],
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  )
}
