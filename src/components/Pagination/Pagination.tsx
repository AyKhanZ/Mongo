import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className={styles.pagination}>
        <li>
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>
            &lt;&lt;
          </button>
        </li>
        {currentPage > 1 && (
          <li>
            <button onClick={() => paginate(currentPage - 1)}>&lt;</button>
          </li>
        )}
        {pageNumbers.map((number: number) => (
          <li
            key={number}
            className={currentPage === number ? styles.active : ""}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button onClick={() => paginate(currentPage + 1)}>&gt;</button>
          </li>
        )}
        <li>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
