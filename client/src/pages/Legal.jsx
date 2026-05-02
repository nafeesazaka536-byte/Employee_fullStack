import React from 'react';
import { ShieldAlert, FileText, Lock } from 'lucide-react';

const Legal = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Legal & Compliance</h2>
      </div>

      <div className="glass-card mb-4">
        <div className="d-flex align-items-center mb-4 border-bottom pb-3">
          <ShieldAlert size={24} className="text-primary me-3" />
          <h4 className="fw-bold mb-0">Disclaimer & Data Protection Notice</h4>
        </div>
        <div className="p-2 text-muted">
          <p>
            <strong>IMPORTANT:</strong> This Enterprise HR CRM System contains sensitive employee data including personally identifiable information (PII), financial records, and contact details.
          </p>
          <p>
            By accessing this system, you agree to handle all data in compliance with internal company policies and relevant data protection regulations (e.g., GDPR, CCPA). Unauthorized access, distribution, or misuse of this information is strictly prohibited and may result in disciplinary action or legal consequences.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="glass-card h-100">
            <h5 className="d-flex align-items-center fw-semibold text-primary mb-3">
              <Lock size={20} className="me-2" /> Privacy Policy
            </h5>
            <div className="text-muted small lh-lg">
              <p>We are committed to protecting the privacy of our employees. Information collected in this system is used solely for human resources management, payroll processing, and organizational planning.</p>
              <p>Data is stored securely using industry-standard encryption. Access is restricted to authorized personnel based on the principle of least privilege.</p>
              <p>Employees have the right to request access to their personal data and request corrections if the data is inaccurate.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="glass-card h-100">
            <h5 className="d-flex align-items-center fw-semibold text-primary mb-3">
              <FileText size={20} className="me-2" /> Terms & Conditions
            </h5>
            <div className="text-muted small lh-lg">
              <p>1. <strong>Acceptable Use:</strong> The system must be used exclusively for business purposes.</p>
              <p>2. <strong>Account Security:</strong> Users are responsible for maintaining the confidentiality of their login credentials.</p>
              <p>3. <strong>Data Accuracy:</strong> HR staff must ensure that data entered into the system is accurate and up-to-date.</p>
              <p>4. <strong>System Monitoring:</strong> Activity within this system is logged and monitored for security and compliance auditing purposes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
