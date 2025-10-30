import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionsPage from "../app/transactions";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path='/' element={<Navigate to='/transactions' replace />} />
        <Route path='/transactions' element={<TransactionsPage />} />
      </Route>
      <Route path='*' />
    </Routes>
  );
};

export default AppRouter;
