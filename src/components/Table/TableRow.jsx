const getNestedValue = (object, path) => path.split('.').reduce((current, key) => current?.[key], object)

function TableRow({ columns, item }) {
  return (
    <tr className="table__row">
      {columns.map((column) => {
        const value = getNestedValue(item, column.key);
        return <td className="table__cell" key={column.key}>{value}</td>;
      })}
    </tr>
  );
}

export default TableRow