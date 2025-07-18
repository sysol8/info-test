import { getUsers } from '../api/users.js';
import { useState, useEffect, useRef } from 'react';
import { getNestedValue } from '../utils/utils.js';

function useUsers({ limit, skip, sortBy, order, filterKey, filterValue }) {
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheRef = useRef({});
  const cacheKey = [limit, skip, sortBy, order, filterKey, filterValue].join(
    '|',
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    if (cacheRef.current[cacheKey]) {
      const { users: cachedUsers, totalItems } = cacheRef.current[cacheKey];
      if (!isMounted) return;
      setUsers(cachedUsers);
      setTotalItems(totalItems);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const usersData = await getUsers({
          limit,
          skip,
          sortBy,
          order,
          filterKey,
          filterValue,
        });
        if (!isMounted) return;
        setUsers(usersData);
        setTotalItems(usersData.total);
        cacheRef.current[cacheKey] = {
          users: usersData,
          totalItems: usersData.total,
        };
      } catch (error) {
        isMounted && setError(error);
      } finally {
        isMounted && setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [limit, skip, sortBy, order, filterKey, filterValue, cacheKey]);
  return { users, totalItems, loading, error };
}

export { useUsers };
