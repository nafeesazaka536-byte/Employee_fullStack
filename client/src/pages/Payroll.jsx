import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Download } from 'lucide-react';
import api from '../api/axios';

const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [formData, setFormData] = useState({
    employee: '',
    bonus: 0,
    deduction: 0
  });

  const fetchData = async () => {
    try {
      const [empRes, payRes] = await Promise.all([
        api.get('/employees'),
        api.get('/payroll')
      ]);
      setEmployees(empRes.data.filter(emp => emp.status === 'Active'));
      setPayrolls(payRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      // Set date to 1st of selected month for consistency
      const date = new Date(`${selectedMonth}-01`).toISOString();
      await api.post('/payroll', {
        ...formData,
        date
      });
      setShowGenerateModal(false);
      setFormData({ employee: '', bonus: 0, deduction: 0 });
      fetchData();
    } catch (error) {
      console.error('Failed to generate payroll', error);
      alert('Error generating payroll');
    }
  };

  // Filter payrolls by selected month
  const filteredPayrolls = payrolls.filter(p => p.date.startsWith(selectedMonth));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Payroll & Reports</h2>
        <div className="d-flex gap-3">
          <input 
            type="month" 
            className="form-control" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <button 
            className="btn btn-primary-custom d-flex align-items-center text-nowrap"
            onClick={() => setShowGenerateModal(true)}
          >
            <DollarSign size={18} className="me-2" /> Generate Payroll
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="glass-card bg-primary text-white p-4 h-100">
            <h5 className="mb-1 opacity-75">Total Payout</h5>
            <h2 className="fw-bold mb-0">
              ${filteredPayrolls.reduce((sum, p) => sum + p.netPay, 0).toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card bg-success text-white p-4 h-100">
            <h5 className="mb-1 opacity-75">Total Bonuses</h5>
            <h2 className="fw-bold mb-0">
              ${filteredPayrolls.reduce((sum, p) => sum + (p.bonus || 0), 0).toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card bg-danger text-white p-4 h-100">
            <h5 className="mb-1 opacity-75">Total Deductions</h5>
            <h2 className="fw-bold mb-0">
              ${filteredPayrolls.reduce((sum, p) => sum + (p.deduction || 0), 0).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      <div className="glass-card p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Base Salary</th>
                <th>Bonus</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
              ) : filteredPayrolls.length > 0 ? (
                filteredPayrolls.map(p => (
                  <tr key={p._id}>
                    <td>
                      <div className="fw-medium text-dark">{p.employee?.name || 'Unknown'}</div>
                      <div className="text-muted small">{p.employee?.department || ''}</div>
                    </td>
                    <td>${p.salary?.toLocaleString() || 0}</td>
                    <td className="text-success">+${p.bonus?.toLocaleString() || 0}</td>
                    <td className="text-danger">-${p.deduction?.toLocaleString() || 0}</td>
                    <td className="fw-bold text-primary">${p.netPay?.toLocaleString() || 0}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-light text-primary border shadow-sm">
                        <Download size={16} /> slip
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="text-center py-5 text-muted">No payroll records found for this month.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Payroll Modal Overlay */}
      {showGenerateModal && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title fw-bold">Generate Payroll</h5>
                <button type="button" className="btn-close" onClick={() => setShowGenerateModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleGenerate}>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Select Employee</label>
                    <select 
                      className="form-select" 
                      required
                      value={formData.employee}
                      onChange={(e) => setFormData({...formData, employee: e.target.value})}
                    >
                      <option value="">Choose...</option>
                      {employees.map(emp => (
                        <option key={emp._id} value={emp._id}>{emp.name} - {emp.department} (${emp.salary})</option>
                      ))}
                    </select>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label className="form-label fw-medium">Bonus Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={formData.bonus}
                          onChange={(e) => setFormData({...formData, bonus: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-medium text-danger">Deductions</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={formData.deduction}
                          onChange={(e) => setFormData({...formData, deduction: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary-custom py-2">
                      Process Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
