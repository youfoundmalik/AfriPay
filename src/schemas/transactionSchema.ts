import * as Yup from "yup";

export const TransactionSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  amount: Yup.number()
    .transform((_, originalValue) => {
      // Makes sure commas don't break the number fields (so 1,000 works nicely)
      const cleaned = String(originalValue).replace(/,/g, "");
      return Number(cleaned);
    })
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  type: Yup.string().required("Type is required").oneOf(["credit", "debit"], "Invalid type"),
});

// Grabs the value types for the form—this stays in sync with changes above
export type TransactionFormData = Yup.InferType<typeof TransactionSchema>;
