import { useContext } from "react";
import TransactionsContext from "../context/TransactionsContext";

export const useTransactions = () => {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used within a TransactionsProvider");
  return ctx;
};
