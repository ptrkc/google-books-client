const StarRating = ({ rating }: { rating: number }) => {
  const star = <span>⭐</span>
  const halfStar = (
    <span className="inline-block relative">
      <span className="inline-block absolute top-0 left-1/2 right-0 bottom-0 bg-white" />
      <span>⭐</span>
    </span>
  )
  const hasHalf = rating % 1 > 0
  const fullStars = rating - (rating % 1)

  return (
    <span>
      {[...Array(fullStars).keys()].map(() => star)}
      {hasHalf && halfStar}
    </span>
  )
}

export default StarRating
