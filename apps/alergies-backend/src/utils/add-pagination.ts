export const addPaging = <T>(
  data: { count: number; rows: T[] },
  page: number,
  limit: number
) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, items, totalPages, currentPage } as {
    totalItems: number;
    items: [];
    totalPages: number;
    currentPage: number;
  };
};
