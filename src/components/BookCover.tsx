import { ImageLinks } from '../hooks/useApi'
import { CameraOffIcon } from './Icons'

export const BookCover = ({
  imageLinks,
  title,
}: {
  imageLinks?: ImageLinks
  title: string
}) => {
  if (imageLinks)
    return (
      <div className="relative w-[128px] h-[192px] flex-none overflow-hidden">
        <div className="bg-gray-400 animate-pulse absolute top-0 bottom-0 right-0 left-0" />
        <img
          src={imageLinks.smallThumbnail}
          className="w-[128px] h-[192px] object-cover flex-none absolute top-0 bottom-0 left-0  right-0"
          alt={`Capa do livro "${title}"`}
        />
      </div>
    )

  return (
    <div className="w-[128px] h-[192px] flex justify-center items-center flex-none bg-gray-300">
      <CameraOffIcon className="text-gray-600 w-10 h-10" />
    </div>
  )
}
