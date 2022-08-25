import React from 'react';

function Pagination({ currentPage, setCurrentPage, pageNumbers }) {
  function nextPage() {
    if (
      pageNumbers.length !== currentPage &&
      pageNumbers.length > currentPage
    ) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage() {
    if (currentPage !== 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  const changePage = (e) => {
    setCurrentPage(Number(e.target.value));
  };
  return (
    <div className="flex justify-center my-3">
      {pageNumbers.length === 1 ? (
        <></>
      ) : (
        <nav>
          <ul className="flex list-style-none">
            {currentPage === 1 ? (
              <></>
            ) : (
              <li class="page-item">
                <button
                  onClick={prevPage}
                  className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                >
                  <span>&laquo;</span>
                </button>
              </li>
            )}
            {pageNumbers.map((number, i) => (
              <li key={i} class="page-item">
                <button
                  className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  onClick={(e) => changePage(e)}
                  value={number}
                >
                  {number}
                </button>
              </li>
            ))}
            {currentPage === pageNumbers.length ? (
              <></>
            ) : (
              <li className="page-item" onClick={nextPage}>
                <button className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                  <span>&raquo;</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Pagination;
