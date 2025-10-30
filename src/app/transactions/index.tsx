import { useState } from "react";
import { RiWalletLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { BiDownload } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";

import Select from "../../ui/Select";
import TextInput from "../../ui/TextInput";
import { useTransactions } from "../../hooks/useTransactions";
import TableContainer from "../../components/tables/TableContainer";
import TransactionsTable from "../../components/tables/TransactionsTable";
import AddTransactionModal from "../../components/modals/AddTransactionModal";
import TransactionSummaryCard from "../../components/pages/transactions/SummaryCard";
import { TRANSACTION_TYPES } from "../../utils/constant";

const TransactionsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalCreditAmount, totalDebitAmount, netBalance, pageData, dataCount, params, setParams, loading, exportToExcel, error, setError } =
    useTransactions();

  return (
    <>
      {error && setError && (
        <div className='w-full bg-red-100 text-red-700 px-4 py-2 flex items-center justify-between mb-2 text-sm rounded'>
          <span>{error}</span>
          <button onClick={() => setError(null)} className='text-lg font-bold leading-none px-2 hover:opacity-70'>
            &times;
          </button>
        </div>
      )}
      <div className='flex-1 flex flex-col gap-8'>
        <div className='w-full flex items-center justify-between gap-10'>
          <p className='text-2xl font-medium w-fit'>Transactions</p>
          <button
            disabled={loading}
            className='px-5 py-2.5 bg-[#27af6d] disabled:cursor-not-allowed text-white rounded-lg cursor-pointer text-[15px] flex items-center gap-2'
            onClick={() => setIsOpen(true)}
          >
            <IoAddOutline className='w-5 h-5' /> <span>Add transaction</span>
          </button>
        </div>

        <div className='flex-1 flex flex-col gap-5'>
          {/* Summary Cards */}
          <div className='flex flex-col md:flex-row gap-5'>
            <TransactionSummaryCard
              amount={totalCreditAmount}
              currency='₦'
              icon={<IoMdTrendingDown className='text-green-700 w-5 h-5' />}
              title='Total inflow'
            />
            <TransactionSummaryCard
              amount={totalDebitAmount}
              currency='₦'
              icon={<IoMdTrendingUp className='text-red-700 w-5 h-5' />}
              title='Total outflow'
            />
            <TransactionSummaryCard amount={netBalance} currency='₦' icon={<RiWalletLine className='w-5 h-5' />} title='Net balance' />
          </div>

          {/* Table Section */}
          <div className='table-section flex-1 p-4 flex flex-col gap-4 border rounded-2xl overflow-clip border-gray-200 relative'>
            {loading && (
              <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-xs'>
                <div className='w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin' />
              </div>
            )}
            <div className='sorting w-full flex flex-col md:flex-row md:items-end gap-5 md:gap-10 md:justify-between'>
              <div className='flex items-center gap-2'>
                <p>Transactions</p>
                <div className='min-w-8 min-h-8 border rounded-lg border-gray-100 flex items-center justify-center'>
                  <span className='text-xs font-medium text-gray-800'>{dataCount > 99 ? "99+" : dataCount}</span>
                </div>
              </div>

              <div className='flex flex-wrap md:flex-nowrap items-center justify-end gap-3'>
                <TextInput
                  containerClass='bg-gray-50 min-w-full md:min-w-[250px] Md:max-w-[250px]'
                  startIcon={<CiSearch className='min-w-5 min-h-5 text-gray-600 mr-1' />}
                  onChange={(e) => setParams((p) => ({ ...p, query: e.target.value }))}
                  value={params.query}
                  placeholder='Search transactions'
                />
                <div className='md:min-w-[100px] flex-1'>
                  <Select onChange={(e) => setParams((p) => ({ ...p, type: e.target.value }))} value={params.type}>
                    <option value=''>Show all</option>
                    {TRANSACTION_TYPES.map(({ key, label }) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </div>

                <button
                  onClick={exportToExcel}
                  disabled={loading}
                  className='min-w-10 min-h-10 disabled:cursor-not-allowed rounded-lg bg-[#27af6d] cursor-pointer flex items-center justify-center'
                >
                  <BiDownload className='text-white min-w-5 min-h-5' />
                </button>
              </div>
            </div>
            <TableContainer
              totalDataCount={dataCount}
              page={params.page}
              pageSize={params.pageSize}
              onPageChange={(page) => setParams((p) => ({ ...p, page }))}
              onPageSizeChange={(pageSize) => setParams((p) => ({ ...p, pageSize }))}
              isLoading={loading}
            >
              <TransactionsTable data={pageData} isLoading={loading} />
            </TableContainer>
          </div>
        </div>
      </div>
      {/* Add transaction modal */}
      <AddTransactionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default TransactionsPage;
