'use client'
const maxItems = 9
const maxLeft = (maxItems - 1) / 2

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  goToNextPage,
  goToPreviousPage,
}: any) => {
  const first = Math.max(currentPage - maxLeft, 1)

  return (
    <ul className="flex">
      <button
        onClick={goToPreviousPage}
        className={`btn ${
          currentPage < 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        Prev
      </button>
      {Array.from({ length: maxItems })
        .map((_, index) => index + first)
        .map((page, i) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(i + first)}
              className={`btn ${
                i + 1 === currentPage ? 'bg-cyan-600 text-white' : ''
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      <button
        onClick={goToNextPage}
        className={`btn ${
          currentPage >= totalPages ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        next
      </button>
    </ul>
  )
}

export default Pagination
