import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0">
          &copy; {new Date().getFullYear()} Enterprise HR CRM. All rights reserved.
        </div>
        <div>
          <Link to="/legal" className="text-muted text-decoration-none me-3">Privacy Policy</Link>
          <Link to="/legal" className="text-muted text-decoration-none">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
