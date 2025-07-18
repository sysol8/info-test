const getNestedValue = (object, path) =>
  path.split('.').reduce((current, key) => current?.[key], object);

export { getNestedValue }