import { ImageLinks } from '../types/BookResponse'
import { cn } from '../utils/classnames'
import { CameraOffIcon } from './Icons'

const sizes = {
  sm: 'w-[128px] h-[192px]',
  lg: 'w-full h-[400px] sm:w-[350px] sm:h-[580px]',
}

export const BookCover = ({
  imageLinks,
  title,
  size,
}: {
  imageLinks?: ImageLinks
  title: string
  size: keyof typeof sizes
}) => {
  if (imageLinks) {
    const { extraLarge, large, medium, small, thumbnail, smallThumbnail } =
      imageLinks
    const bestEfficientImage =
      medium ?? large ?? extraLarge ?? small ?? thumbnail ?? smallThumbnail
    return (
      <img
        src={bestEfficientImage}
        className={cn(sizes[size], 'object-contain bg-gray-200 text-sm p-2')}
        alt={`Capa do livro "${title}"`}
      />
    )
  }

  return (
    <div
      className={cn(
        sizes[size],
        'flex justify-center items-center flex-none bg-gray-300'
      )}
    >
      <CameraOffIcon className="text-gray-600 w-10 h-10" />
    </div>
  )
}
