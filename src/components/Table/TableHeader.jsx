import { useRef, useCallback } from 'react';

function TableHeader({ columns, sortBy, order, onSort }) {
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const handlePointerMove = useCallback((e) => {
    if (Math.abs(e.clientX - startXRef.current) > 2) {
      isDraggingRef.current = true;
    }
  }, []);

  const handlePointerDown = useCallback(
    (e, columnKey, isSortable) => {
      if (!isSortable) return;

      isDraggingRef.current = false;
      startXRef.current = e.clientX;

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', function onPointerUp() {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        if (!isDraggingRef.current) {
          onSort(columnKey);
        }
      });
    },
    [handlePointerMove, onSort],
  );

  return (
    <thead className="table__header">
      <tr className="table__row">
        {columns.map((column) => {
          const isActive = sortBy === column.key;
          const { key, label, sortable } = column;
          return (
            <th
              className={`table__heading ${sortable ? 'table__heading_is-sortable' : ''}`}
              key={key}
              onPointerDown={(e) => handlePointerDown(e, key, sortable)}
            >
              {label}
              {isActive && sortable && (order === 'asc' ? '▲' : '▼')}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
