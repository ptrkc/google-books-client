export interface BookResponse {
  id: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
}

export interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
  listPrice?: SaleInfoListPrice
  retailPrice?: SaleInfoListPrice
  buyLink?: string
}

export interface VolumeInfo {
  title: string
  authors?: string[]
  publisher: string
  publishedDate: string
  description?: string
  pageCount: number
  printedPageCount: number
  averageRating?: number
  ratingsCount?: number
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
  categories?: string[]
  imageLinks?: ImageLinks
}

export interface Dimensions {
  height: string
  width?: string
  thickness?: string
}

export interface ImageLinks {
  smallThumbnail?: string
  thumbnail?: string
  small?: string
  medium?: string
  large?: string
  extraLarge?: string
}
