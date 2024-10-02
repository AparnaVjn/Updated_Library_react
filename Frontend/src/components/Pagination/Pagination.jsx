import React from 'react';

function Pagination({ totalBooks, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalBooks / pageSize);
  const pageNumbers = [];

  // Always add the first page
  if (totalPages > 1) {
    pageNumbers.push(1);
  }

  // Conditionally add middle pages
  if (totalPages > 5) {
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(currentPage + 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
  } else {
    for (let i = 2; i < totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  // Always add the last page
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <div style={{ margin: '20px auto', display: 'flex', justifyContent: 'center' }}>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
        </li>

        {pageNumbers.map((page, index) => (
          <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            {page === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            )}
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
