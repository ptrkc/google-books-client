export interface BookSearchResponse {
  totalItems: number
  items: Item[]
}

export interface Item {
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
}

export interface VolumeInfo {
  title: string
  authors?: string[]
  publishedDate: string
  description?: string
  pageCount?: number
  categories?: string[]
  averageRating?: number
  ratingsCount?: number
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
  publisher?: string
  imageLinks?: ImageLinks
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}
