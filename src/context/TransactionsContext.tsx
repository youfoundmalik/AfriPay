import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import type { TransactionData, TransactionsContextValue, TransactionsFetchResult, TransactionsQueryParams } from "../types/transactions";
import { systemTransactions } from "../utils/mock";
import { DEFAULT_PAGE_SIZE } from "../utils/constant";
import { formatCurrency } from "../utils/functions";

const LOCAL_STORAGE_KEY = "AfriPay_user_transactions";

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [userTransactions, setUserTransactions] = useState<TransactionData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null); // for surfacing user-facing errors
  const [params, setParams] = useState<TransactionsQueryParams>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    type: "",
    query: "",
  });

  // Load saved user transactions from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setUserTransactions(parsed);
      }
    } catch {
      console.warn("Failed to load transactions from storage");
      setError("Couldn't load transactions from your browser. Try refreshing or clearing storage.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Keep localStorage synced with user transactions, but only after initial load
  useEffect(() => {
    if (!isLoaded) return; // Avoid overwriting on first render
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userTransactions));
    } catch {
      console.warn("Failed to save transactions to storage");
      setError("Not enough space to save transactions. Try clearing browser storage.");
    }
  }, [userTransactions, isLoaded]);

  // Adds a new transaction and ensures it’s saved right away
  const addTransaction = useCallback(async (transaction: TransactionData) => {
    setLoading(true);
    setTimeout(() => {
      setUserTransactions((prev) => {
        const updated = [transaction, ...prev];

        // Save immediately so the transaction persists after reload
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          console.warn("Failed to save transaction to storage");
          setError("Couldn't save your new transaction. Your browser storage may be full.");
        }
        return updated;
      });
      setLoading(false);
    }, 800);
  }, []);

  // Merge user-added and system transactions
  const transactions = useMemo(() => [...userTransactions, ...systemTransactions], [userTransactions]);

  // Totals are based on all transactions (not filtered)
  const totals = useMemo(() => {
    const { debit, credit } = transactions.reduce(
      (acc, t) => {
        if (t.type === "debit") acc.debit += t.amount;
        else acc.credit += t.amount;
        return acc;
      },
      { debit: 0, credit: 0 }
    );

    return {
      totalDebitAmount: debit,
      totalCreditAmount: credit,
      netBalance: credit - debit,
    };
  }, [transactions]);

  // Apply search and type filters
  const filtered = useMemo(() => {
    let list = [...transactions];

    if (params.type) {
      list = list.filter((t) => t.type === params.type);
    }

    if (params.query?.trim()) {
      const q = params.query.trim().toLowerCase();
      list = list.filter((t) => [t.tran_id].filter(Boolean).some((v) => v.toLowerCase().includes(q)));
    }

    return list;
  }, [transactions, params.type, params.query]);

  const dataCount = filtered.length;

  // Paginate the filtered results
  const pageData = useMemo(() => {
    const start = (params.page - 1) * params.pageSize;
    return filtered.slice(start, start + params.pageSize);
  }, [filtered, params.page, params.pageSize]);

  // Simulate API fetch
  const fetchTransactions = useCallback(async (): Promise<TransactionsFetchResult> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve({
          items: pageData,
          dataCount,
          totalDebitAmount: totals.totalDebitAmount,
          totalCreditAmount: totals.totalCreditAmount,
          netBalance: totals.netBalance,
        });
      }, 400);
    });
  }, [pageData, dataCount, totals]);

  // Fetch once after mount
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Export transactions (matching current filters) to Excel
  const exportToExcel = useCallback(async () => {
    try {
      setLoading(true);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Transactions");

      // Define column headers
      worksheet.columns = [
        { header: "Transaction ID", key: "tran_id", width: 30 },
        { header: "Description", key: "description", width: 35 },
        { header: "Amount (₦)", key: "amount", width: 15 },
        { header: "Type", key: "type", width: 12 },
        { header: "Date", key: "date", width: 15 },
      ];

      // Add filtered transactions
      filtered.forEach((t) => {
        worksheet.addRow({
          tran_id: t.tran_id,
          description: t.description,
          amount: formatCurrency(t.amount).replace("₦ ", ""),
          type: t.type,
          date: t.date,
        });
      });

      // Make headers bold for clarity
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).alignment = { horizontal: "center" };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `AfriPay_Transactions_${new Date().toISOString().split("T")[0]}.xlsx`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      console.warn("Could not persist transaction");
      setError("Export failed. Try again or check your browser settings.");
    } finally {
      setLoading(false);
    }
  }, [filtered]);

  // Provide everything to the rest of the app
  const value = useMemo<TransactionsContextValue & { error: string | null; setError: typeof setError }>(
    () => ({
      transactions,
      addTransaction,
      userTransactions,
      params,
      setParams,
      pageData,
      dataCount,
      totalDebitAmount: totals.totalDebitAmount,
      totalCreditAmount: totals.totalCreditAmount,
      netBalance: totals.netBalance,
      loading,
      fetchTransactions,
      exportToExcel,
      error,
      setError,
    }),
    [
      transactions,
      addTransaction,
      userTransactions,
      params,
      setParams,
      pageData,
      dataCount,
      totals,
      loading,
      fetchTransactions,
      exportToExcel,
      error,
      setError,
    ]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
};

export default TransactionsContext;
