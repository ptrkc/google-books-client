import { ImageLinks } from '../types/BookResponse'
import { CameraOffIcon } from './Icons'

const sizes = {
  sm: 'min-w-[128px] min-h-[192px]',
  lg: 'min-w-[128px] min-h-[192px] sm:w-[350px] sm:h-[580px]',
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
        className={[
          sizes[size],
          'object-contain bg-gray-200 grow-0 shrink-0 text-sm p-2',
        ].join(' ')}
        alt={`Capa do livro "${title}"`}
      />
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
