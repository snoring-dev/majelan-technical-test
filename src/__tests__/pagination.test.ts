import { paginate } from "@/utils/pagination";

describe('paginate', () => {
  const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should return the first page with 3 items', () => {
    const result = paginate(collection, 3, 1);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return the second page with 3 items', () => {
    const result = paginate(collection, 3, 2);
    expect(result).toEqual([4, 5, 6]);
  });

  it('should return an empty array for an invalid page number', () => {
    const result = paginate(collection, 3, 0);
    expect(result).toEqual([]);
  });

  it('should return an empty array for an out-of-range page number', () => {
    const result = paginate(collection, 3, 5);
    expect(result).toEqual([]);
  });

  it('should return the last page with 1 item', () => {
    const result = paginate(collection, 1, 10);
    expect(result).toEqual([10]);
  });

  it('should return the entire collection if page size is greater than the collection length', () => {
    const result = paginate(collection, 20, 1);
    expect(result).toEqual(collection);
  });
});
