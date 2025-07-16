import { getUsers } from '../api/users.js';
import { useState, useEffect } from 'react';

function useUsers({ limit, skip, sortBy, order }) {
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const usersData = await getUsers({ limit, skip, sortBy, order });
        if (ignore) return;
        setUsers(usersData);
        setTotalItems(usersData.total)
      } catch (error) {
        if (ignore) return;
        console.error(error);
      }
    })();

    return () => {
      ignore = true
    }
  }, [limit, skip, sortBy, order]);
  return { users, totalItems };
}

export { useUsers }
