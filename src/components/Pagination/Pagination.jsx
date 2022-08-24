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
  console.log(currentPage);
  return (
    <div>
      {pageNumbers.length === 1 ? (
        <></>
      ) : (
        <div className="pagination">
          {currentPage === 1 ? (
            <></>
          ) : (
            <button className="page" onClick={prevPage}>
              Anterior
            </button>
          )}
          &nbsp;
          {pageNumbers.map((number, i) => {
            return (
              <button
                className={`page ${currentPage === number ? 'activePage' : ''}`}
                key={i}
                value={number}
                onClick={(e) => changePage(e)}
              >
                {number}
              </button>
            );
          })}
          &nbsp;
          {currentPage === pageNumbers.length ? (
            <></>
          ) : (
            <button className="page" onClick={nextPage}>
              Siguiente
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;
