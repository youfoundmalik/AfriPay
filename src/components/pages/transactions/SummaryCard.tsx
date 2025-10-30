import type { ReactNode } from "react";

interface Props {
  title: string;
  amount: number;
  icon: ReactNode;
  currency: string;
}
const TransactionSummaryCard: React.FC<Props> = ({ amount, icon, title, currency }) => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-5 border rounded-2xl border-gray-200'>
      <div className='flex items-center gap-3'>
        <div className='border border-gray-100 min-w-10 min-h-10 rounded-md flex items-center justify-center'>{icon}</div>
        <p>{title}</p>
      </div>
      <p className='text-3xl font-medium'>
        {currency}{" "}
        {amount?.toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionSummaryCard;
