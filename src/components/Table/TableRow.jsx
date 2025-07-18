import { getNestedValue } from '../../utils/utils.js';

function TableRow({ columns, item, onClick }) {
  return (
    <tr className="table__row">
      {columns.map((column) => {
        const value = getNestedValue(item, column.key);
        return (
          <td className="table__cell" key={column.key} onClick={onClick}>
            {value}
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
