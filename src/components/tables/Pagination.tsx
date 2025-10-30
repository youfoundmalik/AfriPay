import { useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export interface PaginationProps {
  onPageChange?: (page: number) => Promise<void> | void;
  page?: number;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => Promise<void> | void;
  isLoading?: boolean;
  totalDataCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, onPageSizeChange, page = 1, pageSize = 15, isLoading, totalDataCount }) => {
  const [pagination, setPagination] = useState({ page, pageSize });

  const isLastPage = pagination.page * pagination.pageSize >= totalDataCount;
  const totalPages = Math.ceil(totalDataCount / pagination.pageSize) || 1;
  const displayRange = `Page ${pagination.page} of ${totalPages}`;

  const handlePageChange = async (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPagination((prev) => ({ ...prev, page: nextPage }));
    await onPageChange?.(nextPage);
  };

  const handleSizeChange = async (nextSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize: nextSize, page: 1 }));
    await onPageSizeChange?.(nextSize);
  };

  return (
    <div className='w-full flex justify-between gap-5 items-center mt-5 flex-wrap lg:flex-nowrap px-5'>
      {/* Entries per page */}
      <div className='flex gap-2 items-center justify-center order-3 md:order-2 lg:order-1 w-full md:w-fit'>
        <p className='text-gray-400 text-sm'>Showing</p>
        <div className='w-14'>
          <select
            className='border border-gray-200 rounded-lg px-2 py-1 text-sm cursor-pointer font-medium w-full focus:outline-none'
            value={pagination.pageSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            disabled={isLoading}
          >
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <p className='text-gray-400 text-sm'>entries</p>
      </div>

      {/* Page info */}
      <p className='text-black/80 text-xs font-medium text-center order-1 lg:order-2 md:w-full lg:w-fit'>
        {isLoading ? "Loading..." : displayRange}
      </p>

      {/* Navigation buttons */}
      <div className='flex items-center order-2 md:order-3 border border-gray-200 rounded-lg overflow-hidden'>
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={isLoading || pagination.page === 1}
          className={`px-3 py-2 flex items-center cursor-pointer justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition`}
        >
          <MdArrowLeft className='w-5 h-5 text-gray-500' />
        </button>

        <span className='px-4 py-2 text-sm font-medium text-[#27af6d] bg-[#27af6d]/10 select-none'>{pagination.page}</span>

        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={isLoading || isLastPage}
          className={`px-3 py-2 flex items-center cursor-pointer justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition`}
        >
          <MdArrowRight className='w-5 h-5 text-gray-500' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
