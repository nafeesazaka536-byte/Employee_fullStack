import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Settings from './pages/Settings';
import Legal from './pages/Legal';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="settings" element={<Settings />} />
          <Route path="legal" element={<Legal />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
