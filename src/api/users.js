const BASE_URL = 'https://dummyjson.com';

export const getUsers = async ({ limit, skip, sortBy = null, order = 'asc', filterKey = null, filterValue = null }) => {
  const endpoint = filterKey && filterValue
    ? '/users/filter'
    : '/users';

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy) {
    params.append('sortBy', sortBy);
    params.append('order', order);
  }

  if (filterKey && filterValue) {
    params.append('key', filterKey);
    params.append('value', filterValue);
  }

  const url = `${BASE_URL}${endpoint}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
