import type { Dispatch, SetStateAction } from "react";

export type TransactionData = {
  tran_id: string;
  description: string;
  amount: number;
  type: string;
  date: string;
};

export type TransactionsQueryParams = {
  type?: "credit" | "debit" | string;
  page: number;
  pageSize: number;
  query?: string;
};

export type TransactionsFetchResult = {
  items: TransactionData[];
  dataCount: number;
  totalDebitAmount: number;
  totalCreditAmount: number;
  netBalance: number;
};

export type TransactionsContextValue = {
  transactions: TransactionData[];
  addTransaction: (transaction: TransactionData) => Promise<void>;
  userTransactions: TransactionData[];
  params: TransactionsQueryParams;
  setParams: Dispatch<SetStateAction<TransactionsQueryParams>>;
  pageData: TransactionData[];
  dataCount: number;
  totalDebitAmount: number;
  totalCreditAmount: number;
  netBalance: number;
  loading: boolean;
  fetchTransactions: () => Promise<TransactionsFetchResult>;
  exportToExcel: () => Promise<void>;
  error?: string | null;
  setError?: Dispatch<SetStateAction<string | null>>;
};
