'use client'
const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  goToNextPage,
  goToPreviousPage,
}: any) => {
  const start = 1
  const end = totalPages

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm">
        <li onClick={goToPreviousPage} className={``}>
          <a
            className={` ${
              currentPage <= 1 ? 'pointer-events-none invisible' : ''
            } ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            href="#"
          >
            Prev
          </a>
        </li>
        {Array.from({ length: end - start + 1 })
          .map((_, index) => start + index)
          .map((page) => (
            <li key={page}>
              <a
                onClick={() => setCurrentPage(page)}
                className={`${
                  page === currentPage
                    ? 'flex h-8 cursor-pointer items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'flex h-8 cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {page}
              </a>
            </li>
          ))}
        <li onClick={goToNextPage}>
          <a
            className={`${
              currentPage >= totalPages ? 'pointer-events-none invisible' : ''
            } dark:hover:text-white} flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700`}
            href="#"
          >
            next
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
