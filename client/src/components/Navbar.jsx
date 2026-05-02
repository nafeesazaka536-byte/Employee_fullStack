import React from 'react';
import { Menu, Bell, Search, UserCircle } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="top-navbar d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <button className="btn btn-light d-md-none me-3" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className="input-group d-none d-md-flex" style={{ width: '300px' }}>
          <span className="input-group-text bg-white border-end-0" id="search-addon">
            <Search size={18} className="text-muted" />
          </span>
          <input 
            type="text" 
            className="form-control border-start-0 ps-0" 
            placeholder="Search employees..." 
            aria-label="Search" 
            aria-describedby="search-addon"
          />
        </div>
      </div>
      
      <div className="d-flex align-items-center">
        <button className="btn btn-light rounded-circle p-2 me-3 position-relative">
          <Bell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>
        </button>
        <div className="d-flex align-items-center cursor-pointer">
          <div className="me-2 text-end d-none d-sm-block">
            <div className="fw-bold" style={{ fontSize: '0.9rem' }}>Admin User</div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>HR Manager</div>
          </div>
          <UserCircle size={36} className="text-primary" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
