function TableHeader({ columns, sortBy, order, onSort }) {
  return (
    <thead className="table__header">
      <tr className="table__row">
        {columns.map((column) => {
          const isActive = sortBy === column.key;
          const isSortable = column.sortable;
          return (
            <th
              className={`table__heading ${isSortable ? 'table__heading_is-sortable' : ''}`}
              key={column.key}
              onClick={() => isSortable && onSort(column.key)}
            >
              {column.label}
              {isActive && isSortable && (order === 'asc' ? '▲' : '▼')}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
