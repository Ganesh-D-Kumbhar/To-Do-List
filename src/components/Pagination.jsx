import React from "react";

const Pagination = ({ currentPage, totalTasks, tasksPerPage, paginate }) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <div className="pagination-controls">
      <div className="bottomLeft">
        <button>{totalPages || 1}</button>
      </div>
      <div className="bottomRight">
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {`< Prev`}
        </button>
        <button>{currentPage}</button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {`Next >`}
        </button>
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
        >
          {`Last`}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
