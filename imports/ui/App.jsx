import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { HomePage } from './components/pages/HomePage';
import { PrivateRoute } from './components/PrivateRoute';
import { ForgotPasswordPage } from './components/pages/ForgotPasswordPage';
import { ResetPasswordPage } from './components/pages/ResetPasswordPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminRoute } from './components/admin/AdminRoute';
import { SchedulePage } from './components/pages/SchedulePage';
import { ServiceAdmin } from './components/admin/ServiceAdmin'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/service" element={<ServiceAdmin />} />
        <Route path="/schedule-page" element={<SchedulePage/>}/>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};
