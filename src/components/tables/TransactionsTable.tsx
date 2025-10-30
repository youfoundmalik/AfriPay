import clsx from "clsx";
import { Td, Th } from ".";
import type { TransactionData } from "../../types/transactions";
import { formatTransactionDate, formatCurrency } from "../../utils/functions";

interface TProps {
  data: TransactionData[];
  isLoading: boolean;
}

const TransactionsTable: React.FC<TProps> = ({ data }) => {
  return (
    <table className='w-full'>
      <thead>
        <tr>
          <Th>id</Th>
          <Th className='md:px-10'>description</Th>
          <Th>amount</Th>
          <Th className='md:px-10'>type</Th>
          <Th>date</Th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <tr key={i} className='border-b border-gray-100 last-of-type:border-b-0'>
            <Td className='truncate'>{item?.tran_id}</Td>
            <Td className='md:px-10 min-w-[400px]'>{item?.description}</Td>
            <Td className='min-w-fit text-nowrap'>{formatCurrency(item?.amount)}</Td>
            <Td
              className={clsx("md:px-10 capitalize", {
                "text-green-700": item?.type === "credit",
                "text-red-700": item?.type === "debit",
              })}
            >
              {item?.type}
            </Td>
            <Td className='min-w-fit text-nowrap'>{formatTransactionDate(item?.date)}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
