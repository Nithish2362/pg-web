import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Overview from './components/Overview';
import TenantDetails from './components/TenantDetails';
import PaymentHistory from './components/PaymentHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="details" element={<TenantDetails />} />
          <Route path="payments" element={<PaymentHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

