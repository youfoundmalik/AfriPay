import { v4 as uuidv4 } from "uuid";

import ModalBase from ".";
import { useTransactions } from "../../hooks/useTransactions";
import AddTransactionForm from "../forms/AddTransactionForm";
import type { TransactionFormData } from "../../schemas/transactionSchema";

interface MProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddTransactionModal: React.FC<MProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useTransactions();

  const handleSubmit = async (v: TransactionFormData) => {
    const { amount, description, type } = v;

    // Generate today's date
    const today = new Date();
    const date = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

    // Generate transaction ID (GUID)
    const tran_id = uuidv4();

    const payload = {
      amount,
      description,
      type,
      date,
      tran_id,
    };

    await addTransaction(payload);
    onClose();
  };

  return (
    <ModalBase header='Add transaction' isOpen={isOpen} onClose={onClose}>
      <AddTransactionForm onSubmit={handleSubmit} />
    </ModalBase>
  );
};

export default AddTransactionModal;
