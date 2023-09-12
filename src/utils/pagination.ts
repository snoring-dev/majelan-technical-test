export function paginate<T>(
  collection: T[],
  page_size: number,
  page_number: number
): T[] {
  return collection.slice(
    (page_number - 1) * page_size,
    page_number * page_size
  );
}
