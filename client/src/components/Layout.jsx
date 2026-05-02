import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="content-area animate-fade-in">
          <Outlet />
        </main>
        <Footer />
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark" 
          style={{ opacity: 0.5, zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;
