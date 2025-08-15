export const calculatePaginationData = (count, perPage, page) => {
    const totalPages = Math.max(1, Math.ceil(count / perPage));
    const currentPage = Math.min(Math.max(1, page), totalPages);
  
    return {
      page: currentPage,
      perPage,
      totalItems: count,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  };
  