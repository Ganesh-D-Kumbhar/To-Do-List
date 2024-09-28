import React from "react";

const Pagination = ({ currentPage, totalTasks, tasksPerPage, paginate }) => {
  let totalPages = Math.ceil(totalTasks / tasksPerPage);
  if (totalPages === 0) {
    totalPages = 1;
  }
  const handlePagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  return (
    <div className="pagination-controls">
      <div className="bottomLeft">
        <button>Total Pages: {totalPages || 1}</button>
      </div>
      <div className="bottomRight">
        <button
          onClick={() => handlePagination(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {`< Prev`}
        </button>
        <button>{currentPage}</button>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {console.log(currentPage, totalPages)}
          {`Next >`}
        </button>
        <button
          onClick={() => handlePagination(totalPages)}
          disabled={currentPage === totalPages}
        >
          {`Last`}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
