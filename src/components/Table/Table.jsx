import '../../styles/table.css';
import TableHeader from './TableHeader.jsx';
import TableBody from './TableBody.jsx';
import { useUsers } from '../../hooks/useUsers.js';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination.jsx';

const columns = [
  { key: 'lastName', label: 'Фамилия', sortable: true },
  { key: 'firstName', label: 'Имя', sortable: true },
  { key: 'maidenName', label: 'Отчество', sortable: true },
  { key: 'age', label: 'Возраст', sortable: true },
  { key: 'gender', label: 'Пол', sortable: true },
  { key: 'phone', label: 'Номер телефона', sortable: true },
  { key: 'email', label: 'Email', sortable: false },
  { key: 'address.country', label: 'Страна', sortable: false },
  { key: 'address.city', label: 'Город', sortable: false },
];

function Table() {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const pagesToSkip = (page - 1) * ITEMS_PER_PAGE;

  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState('asc');

  const { users, totalItems } = useUsers({
    limit: ITEMS_PER_PAGE,
    skip: pagesToSkip,
    sortBy: sortBy,
    order: order,
  });

  const handleSort = (columnKey) => {
    if (sortBy !== columnKey) {
      setSortBy(columnKey);
      setOrder('asc');
    } else if (order === 'asc') {
      setOrder('desc');
    } else {
      setSortBy(null);
    }
    setPage(1);
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <TableHeader
          columns={columns}
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
        ></TableHeader>
        <TableBody columns={columns} data={users.users}></TableBody>
      </table>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={page}
        onPageSelect={setPage}
      ></Pagination>
    </div>
  );
}

export default Table;
