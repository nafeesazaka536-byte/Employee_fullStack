import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Search, Filter, Plus } from 'lucide-react';
import api from '../api/axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');

  const fetchEmployees = async () => {
    try {
      const { data } = await api.get('/employees');
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Failed to delete employee', error);
        alert('Error deleting employee');
      }
    }
  };

  const filteredEmployees = employees.filter(emp => {
    return (
      (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.cnic.includes(searchTerm)) &&
      (filterDept === '' || emp.department === filterDept)
    );
  });

  const uniqueDepartments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Employee Management</h2>
        <Link to="/add-employee" className="btn btn-primary-custom d-flex align-items-center">
          <Plus size={18} className="me-2" /> Add Employee
        </Link>
      </div>

      <div className="glass-card mb-4 p-3">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0" 
                placeholder="Search by name, email, or CNIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Filter size={18} className="text-muted" />
              </span>
              <select 
                className="form-select border-start-0 ps-0"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
              >
                <option value="">All Departments</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-2 text-end">
            <button 
              className="btn btn-outline-secondary w-100" 
              onClick={() => {setSearchTerm(''); setFilterDept('');}}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Contact info</th>
                <th>Department & Role</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
              ) : filteredEmployees.length > 0 ? (
                filteredEmployees.map(emp => (
                  <tr key={emp._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px', fontWeight: 'bold' }}>
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{emp.name}</div>
                          <div className="text-muted small">CNIC: {emp.cnic}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{emp.email}</div>
                      <div className="text-muted small">{emp.phone}</div>
                    </td>
                    <td>
                      <div className="fw-medium">{emp.department}</div>
                      <div className="text-muted small">{emp.jobTitle}</div>
                    </td>
                    <td>
                      <span className={`badge bg-${emp.status === 'Active' ? 'success' : 'danger'} bg-opacity-10 text-${emp.status === 'Active' ? 'success' : 'danger'} rounded-pill px-3 py-2`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link to={`/edit-employee/${emp._id}`} className="btn btn-sm btn-light text-primary me-2 shadow-sm rounded-3">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => deleteHandler(emp._id)} className="btn btn-sm btn-light text-danger shadow-sm rounded-3">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-5 text-muted">No employees found matching the criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
