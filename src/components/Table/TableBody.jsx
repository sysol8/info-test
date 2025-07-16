import TableRow from './TableRow.jsx';

function TableBody({ columns, data = [] }) {
  return (
    <tbody className="table__body">
      {data.map((item) => (
        <TableRow key={item.id} columns={columns} item={item} />
      ))}
    </tbody>
  );
}

export default TableBody;
