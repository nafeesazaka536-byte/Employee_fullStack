import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, User } from 'lucide-react';
import api from '../api/axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    salary: '',
    status: 'Active'
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await api.get(`/employees/${id}`);
        setFormData(data);
        setFetchLoading(false);
      } catch (err) {
        setError('Failed to fetch employee details');
        setFetchLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.put(`/employees/${id}`, {
        ...formData,
        salary: Number(formData.salary)
      });
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  return (
    <div className="max-w-3xl mx-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Edit Employee</h2>
      </div>

      <div className="glass-card">
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-12 mb-2 border-bottom pb-2">
              <h5 className="d-flex align-items-center fw-semibold text-primary">
                <User size={20} className="me-2" /> Personal Information
              </h5>
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Full Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">CNIC Number</label>
              <input type="text" className="form-control" name="cnic" value={formData.cnic} onChange={handleChange} required />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Email Address</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Phone Number</label>
              <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="col-md-12 mt-4 mb-2 border-bottom pb-2">
              <h5 className="d-flex align-items-center fw-semibold text-primary">
                <User size={20} className="me-2" /> Employment Details
              </h5>
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Department</label>
              <select className="form-select" name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option value="IT">IT & Engineering</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance & Accounting</option>
                <option value="Marketing">Marketing & Sales</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Job Title</label>
              <input type="text" className="form-control" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Base Salary (Monthly)</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Status</label>
              <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="col-12 mt-5 text-end border-top pt-4">
              <button type="button" className="btn btn-light me-3 px-4" onClick={() => navigate('/employees')}>
                <X size={18} className="me-1" /> Cancel
              </button>
              <button type="submit" className="btn btn-primary-custom px-4" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : <Save size={18} className="me-1" />}
                Update Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
