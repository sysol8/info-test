import TableRow from './TableRow.jsx';

function TableBody({ columns, data = [], onRowClick }) {
  return (
    <tbody className="table__body">
      {data.map((item) => (
        <TableRow key={item.id} columns={columns} item={item} onClick={() => onRowClick(item)} />
      ))}
    </tbody>
  );
}

export default TableBody;
