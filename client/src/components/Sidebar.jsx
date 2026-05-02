import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  CalendarCheck, 
  Banknote, 
  Settings, 
  ShieldAlert,
  Building2
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <Building2 size={28} />
        <span>HR CRM</span>
      </div>
      <div className="d-flex flex-column mt-4">
        <NavLink to="/" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <LayoutDashboard /> Dashboard
        </NavLink>
        <NavLink to="/employees" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <Users /> Employees
        </NavLink>
        <NavLink to="/add-employee" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <UserPlus /> Add Employee
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <CalendarCheck /> Attendance
        </NavLink>
        <NavLink to="/payroll" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <Banknote /> Payroll & Reports
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <Settings /> Settings
        </NavLink>
        <NavLink to="/legal" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <ShieldAlert /> Legal
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
