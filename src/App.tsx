import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './config/query-client'; // Nomlangan import
import MainLayout from './layout/MainLayout';
import Login from './page/login/Login';
import ForgotPassword from './page/login/ForgotPassword';
import UserProfile from './page/login/UserProfile';
import Home from './page/home/Home';
import CreateCustomer from './page/create-customer/CreateCustomer';
import CreateDebt from './page/debt/CreateDebt';
import AddPayment from './page/payments/AddPayment';
import PaymentHistory from './page/payments/PaymentHistory';
import QRPayment from './page/payments/QRPayment';
import Calendar from './page/calendar/Calendar';
import LatePayments from './page/reports/LatePayments';
import TopDebtors from './page/reports/TopDebtors';
import ExportImport from './page/reports/ExportImport';
import CompanySettings from './page/settings/CompanySettings';
import UserManagement from './page/settings/UserManagement';
import NotificationSettings from './page/notifications/NotificationSettings';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-customer" element={<CreateCustomer />} />
            <Route path="/create-debt" element={<CreateDebt />} />
            <Route path="/add-payment" element={<AddPayment />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/qr-payment" element={<QRPayment />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/late-payments" element={<LatePayments />} />
            <Route path="/top-debtors" element={<TopDebtors />} />
            <Route path="/export-import" element={<ExportImport />} />
            <Route path="/company-settings" element={<CompanySettings />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;