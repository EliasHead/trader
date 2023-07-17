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
      {Array.from({ length: maxItems }, (_, index) => index + first).map(
        (page, i) => (
          <li key={page}>
            <button onClick={() => setCurrentPage(i + first)} className={`btn`}>
              {page}
            </button>
          </li>
        ),
      )}
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

  // <ul className="flex">
  //   <button
  //     onClick={goToPreviousPage}
  //     className={`btn ${
  //       currentPage < 1 ? 'cursor-not-allowed opacity-50' : ''
  //     }`}
  //   >
  //     Prev
  //   </button>
  //   {Array.from({ length: maxItems }, (_, index) => index + 1).map(
  //     (page, i) => (
  //       <li key={page}>
  //         <button onClick={() => setCurrentPage(i + 1)} className={`btn`}>
  //           {page}
  //         </button>
  //       </li>
  //     ),
  //   )}
  //   <button
  //     onClick={goToNextPage}
  //     className={`btn ${
  //       currentPage >= totalPages ? 'cursor-not-allowed opacity-50' : ''
  //     }`}
  //   >
  //     next
  //   </button>
  // </ul>
}

export default Pagination
