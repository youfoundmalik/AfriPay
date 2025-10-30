import clsx from "clsx";
import { format } from "date-fns";

import { Td, Th } from ".";
import type { TransactionData } from "../../types/transactions";

interface TProps {
  data: TransactionData[];
  isLoading: boolean;
}

const TransactionsTable: React.FC<TProps> = ({ data }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <Th>id</Th>
          <Th className="px-10">description</Th>
          <Th>amount</Th>
          <Th className="px-10">type</Th>
          <Th>date</Th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => {
          // Try to parse the date safely — handle both string and Date values
          let formattedDate = "—";
          if (item?.date) {
            try {
              // Convert dd/mm/yyyy → yyyy-mm-dd if necessary
              const parts = item.date.split("/");
              const safeDate =
                parts.length === 3
                  ? new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
                  : new Date(item.date);
              formattedDate = format(safeDate, "MMM dd, yyyy");
            } catch {
              formattedDate = "Invalid date";
            }
          }

          return (
            <tr
              key={i}
              className="border-b border-gray-100 last-of-type:border-b-0"
            >
              <Td className="truncate">{item?.tran_id}</Td>
              <Td className="px-10">{item?.description}</Td>

              {/* Always format the amount nicely with commas */}
              <Td className="min-w-fit text-nowrap">
                ₦ {Number(item?.amount || 0).toLocaleString()}
              </Td>

              {/* Color-code the transaction type for readability */}
              <Td
                className={clsx("px-10 capitalize", {
                  "text-green-700": item?.type === "credit",
                  "text-red-700": item?.type === "debit",
                })}
              >
                {item?.type}
              </Td>

              <Td className="min-w-fit text-nowrap">{formattedDate}</Td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
