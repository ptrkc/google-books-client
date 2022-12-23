import { ImageLinks } from '../types/BookResponse'
import { CameraOffIcon } from './Icons'

const sizes = {
  sm: 'w-[128px] h-[192px]',
  lg: 'w-[575px] h-[850px]',
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
      <div
        className={[sizes[size], 'relative flex-none overflow-hidden'].join(
          ' '
        )}
      >
        <div className="bg-gray-400 animate-pulse absolute top-0 bottom-0 right-0 left-0" />
        <img
          src={bestEfficientImage}
          className={[
            sizes[size],
            'object-cover flex-none absolute top-0 bottom-0 left-0  right-0',
          ].join(' ')}
          alt={`Capa do livro "${title}"`}
        />
      </div>
    )
  }

  return (
    <div
      className={[
        sizes[size],
        'flex justify-center items-center flex-none bg-gray-300',
      ].join(' ')}
    >
      <CameraOffIcon className="text-gray-600 w-10 h-10" />
    </div>
  )
}
