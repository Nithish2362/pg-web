import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Overview from './components/Overview';
import TenantDetails from './components/TenantDetails';
import PaymentHistory from './components/PaymentHistory';
import Complaints from './components/Complaints';
import Notices from './components/Notices';
import GatePass from './components/GatePass';
import Visitors from './components/Visitors';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<TenantDetails />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="notices" element={<Notices />} />
          <Route path="gatepass" element={<GatePass />} />
          <Route path="visitors" element={<Visitors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

