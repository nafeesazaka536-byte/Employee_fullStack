import React from 'react';
import { Settings as SettingsIcon, Database, Server, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">System Settings</h2>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="glass-card mb-4">
            <h5 className="d-flex align-items-center fw-semibold text-primary mb-4 border-bottom pb-3">
              <Server size={20} className="me-2" /> Server Configuration
            </h5>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-medium text-muted">Node Environment</label>
              <div className="col-sm-8">
                <input type="text" readOnly className="form-control-plaintext fw-bold" value={import.meta.env.MODE || "development"} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-medium text-muted">API Base URL</label>
              <div className="col-sm-8">
                <input type="text" readOnly className="form-control-plaintext text-primary" value={import.meta.env.VITE_API_URL || "/api"} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-medium text-muted">Frontend Host</label>
              <div className="col-sm-8">
                <input type="text" readOnly className="form-control-plaintext" value={window.location.origin} />
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h5 className="d-flex align-items-center fw-semibold text-primary mb-4 border-bottom pb-3">
              <Database size={20} className="me-2" /> Database Info (Safe View)
            </h5>
            <div className="alert alert-warning mb-4">
              <strong>Note:</strong> Sensitive database credentials are not exposed to the client. This information represents the status of the connection.
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-medium text-muted">Status</label>
              <div className="col-sm-8">
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">Connected</span>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-medium text-muted">Type</label>
              <div className="col-sm-8">
                <input type="text" readOnly className="form-control-plaintext" value="MongoDB Atlas (Cloud)" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="glass-card h-100">
            <h5 className="d-flex align-items-center fw-semibold text-primary mb-4 border-bottom pb-3">
              <Shield size={20} className="me-2" /> Admin Actions
            </h5>
            <p className="text-muted small mb-4">These actions affect the entire system and cannot be undone easily.</p>
            
            <div className="d-grid gap-3">
              <button className="btn btn-outline-primary text-start p-3 rounded-3 d-flex align-items-center justify-content-between">
                <span className="fw-medium">Clear Application Cache</span>
                <SettingsIcon size={18} />
              </button>
              <button className="btn btn-outline-secondary text-start p-3 rounded-3 d-flex align-items-center justify-content-between">
                <span className="fw-medium">Export System Logs</span>
                <SettingsIcon size={18} />
              </button>
              <button className="btn btn-outline-danger text-start p-3 rounded-3 d-flex align-items-center justify-content-between">
                <span className="fw-medium">Force Sync Database</span>
                <Database size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
