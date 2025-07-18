import '../../styles/table.css';
import TableHeader from './TableHeader.jsx';
import TableBody from './TableBody.jsx';
import { useUsers } from '../../hooks/useUsers.js';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination.jsx';
import Popup from '../Popup/Popup.jsx';
import Filter from '../Filter/Filter.jsx';

const columns = [
  { key: 'lastName', label: 'Фамилия', sortable: true, filterable: true, type: 'text' },
  { key: 'firstName', label: 'Имя', sortable: true, filterable: true, type: 'text' },
  { key: 'maidenName', label: 'Отчество', sortable: true, filterable: true, type: 'text' },
  { key: 'age', label: 'Возраст', sortable: true, filterable: true, type: 'number' },
  { key: 'gender', label: 'Пол', sortable: true, filterable: true, type: 'select', options: [ { key: 'male', label: 'Мужской' }, { key: 'female', label: 'Женский' } ] },
  { key: 'phone', label: 'Номер телефона', sortable: true, filterable: true, type: 'tel' },
  { key: 'email', label: 'Email', sortable: false, filterable: false, type: 'email' },
  { key: 'address.country', label: 'Страна', sortable: false, filterable: false, type: 'text' },
  { key: 'address.city', label: 'Город', sortable: false, filterable: false, type: 'text' },
];

function Table() {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const pagesToSkip = (page - 1) * ITEMS_PER_PAGE;

  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState('asc');

  const [filterKey, setFilterKey] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const handleFilter = (key, value) => {
    setFilterKey(key);
    setFilterValue(value);
    setPage(1);
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const { users, totalItems, loading, error } = useUsers({
    limit: ITEMS_PER_PAGE,
    skip: pagesToSkip,
    sortBy: sortBy,
    order: order,
    filterKey: filterKey,
    filterValue: filterValue,
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

  if (loading) return <p className="message">Загрузка...</p>;
  if (error) return <p className="message">{error.message}</p>;
  if (totalItems === 0)
    return (
      <>
        <Filter
          columns={columns.filter((column) => column.filterable)}
          onFilter={handleFilter}
        />
        <p className="message">
          Нет результатов по установленному фильтру <br />
          Для отображения таблицы нажмите "Применить" или обновите страницу.
        </p>
      </>
    );

  return (
    <>
      <Filter
        columns={columns.filter((column) => column.filterable)}
        onFilter={handleFilter}
      />
      <div className="table-wrapper">
        <table className="table">
          <TableHeader
            columns={columns}
            sortBy={sortBy}
            order={order}
            onSort={handleSort}
          ></TableHeader>
          <TableBody
            columns={columns}
            data={users.users}
            onRowClick={handleRowClick}
          ></TableBody>
        </table>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={page}
          onPageSelect={setPage}
        ></Pagination>

        {selectedUser && <Popup user={selectedUser} onClose={closeModal} />}
      </div>
    </>
  );
}

export default Table;
