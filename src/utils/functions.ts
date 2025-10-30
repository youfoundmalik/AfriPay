import { format } from "date-fns";

export function formatTransactionDate(dateStr: string | Date): string {
  try {
    if (!dateStr) return "—";
    if (typeof dateStr === "string" && dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        return format(new Date(`${parts[2]}-${parts[1]}-${parts[0]}`), "MMM dd, yyyy");
      }
    }
    return format(new Date(dateStr), "MMM dd, yyyy");
  } catch {
    return "Invalid date";
  }
}

export function formatCurrency(amount: number | string) {
  return `₦ ${(Number(amount) || 0).toLocaleString()}`;
}
