import styles from './Pagination.module.css';
import PageList from '../PageList/PageList.jsx';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageSelect }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={() => onPageSelect(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <PageList
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageSelect={onPageSelect}
        ></PageList>
        <button
          className={styles.button}
          onClick={() => onPageSelect(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
