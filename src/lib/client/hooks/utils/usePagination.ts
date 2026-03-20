import { useState, useMemo, useCallback } from "react";

export const usePagination = <T>(data: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNumber);
    },
    [totalPages],
  );

  return useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      totalPages,
      paginatedData,
      goToPage,
      itemsPerPage,
    }),
    [currentPage, totalPages, paginatedData, goToPage, itemsPerPage],
  );
};
