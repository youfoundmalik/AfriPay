import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import Pagination, { type PaginationProps } from "./Pagination";

type DivProps = ComponentPropsWithoutRef<"div"> & PaginationProps;

const TableContainer: React.FC<DivProps> = ({
  className,
  children,
  totalDataCount,
  onPageChange,
  page,
  pageSize,
  onPageSizeChange,
  isLoading,
  ...props
}) => {
  const showPagination = page || pageSize;

  return (
    <>
      <div className={clsx("table-container flex-1 w-full overflow-x-auto border border-gray-200 rounded-xl", className)} {...props}>
        {children}
      </div>
      {showPagination && totalDataCount > 0 && (
        <Pagination
          pageSize={pageSize ?? 15}
          page={page ?? 1}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          isLoading={isLoading}
          totalDataCount={totalDataCount}
        />
      )}
    </>
  );
};

export default TableContainer;
