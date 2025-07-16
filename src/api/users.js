const BASE_URL = 'https://dummyjson.com';

export const getUsers = async ({ limit, skip, sortBy = null, order = 'asc' }) => {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy) {
    params.append('sortBy', sortBy);
    params.append('order', order);
  }

  const url = `${BASE_URL}/users?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
