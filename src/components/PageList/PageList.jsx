import styles from './PageList.module.css';

const LEFT_ELLIPSIS = 'LEFT';
const RIGHT_ELLIPSIS = 'RIGHT';

function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

function PageList({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageSelect,
  neighborCount = 1,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalNumbers = neighborCount * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  let pages = [];

  if (totalPages <= totalBlocks) {
    pages = range(1, totalPages);
  } else {
    const startPage = Math.max(2, currentPage - neighborCount);
    const endPage = Math.min(totalPages - 1, currentPage + neighborCount);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = endPage < totalPages - 1;

    if (!hasLeftSpill && hasRightSpill) {
      const leftRange = range(2, endPage + (neighborCount - (currentPage - 1)));
      pages = [1, ...leftRange, RIGHT_ELLIPSIS, totalPages];
    } else if (hasLeftSpill && !hasRightSpill) {
      const rightRange = range(
        startPage - (neighborCount - (totalPages - currentPage)),
        totalPages - 1,
      );
      pages = [1, LEFT_ELLIPSIS, ...rightRange, totalPages];
    } else {
      pages = [
        1,
        LEFT_ELLIPSIS,
        ...range(startPage, endPage),
        RIGHT_ELLIPSIS,
        totalPages,
      ];
    }
  }

  return (
    <ul className={styles.list}>
      {pages.map((page, index) => {
        if (page === LEFT_ELLIPSIS || page === RIGHT_ELLIPSIS) {
          return (
            <li key={page + index} className={styles.item}>
              <span className={styles.ellipsis}>...</span>
            </li>
          );
        } else {
          const isActive = page === currentPage;
          return (
            <li key={page} className={styles.item}>
              <button
                className={`${styles.button} ${isActive ? styles.active : ''}`}
                onClick={() => onPageSelect(page)}
                disabled={isActive}
              >
                {page}
              </button>
            </li>
          );
        }
      })}
    </ul>
  );

  /*return (
    <ul className={styles.list}>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;
        return (
          <li className={styles.item} key={pageNumber}>
            <button
              className={`${styles.button} ${isActive ? styles.active : ''}`}
              onClick={() => onPageSelect(pageNumber)}
              disabled={isActive}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
    </ul>
  );*/
}

export default PageList;
