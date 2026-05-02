import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import api from '../api/axios';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchData = async () => {
    try {
      const [empRes, attRes] = await Promise.all([
        api.get('/employees'),
        api.get('/attendance')
      ]);
      setEmployees(empRes.data.filter(emp => emp.status === 'Active'));
      setAttendanceRecords(attRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markAttendance = async (employeeId, status) => {
    try {
      await api.post('/attendance', {
        employee: employeeId,
        date: selectedDate,
        status
      });
      fetchData(); // Refresh records
    } catch (error) {
      console.error('Failed to mark attendance', error);
      alert('Error marking attendance');
    }
  };

  // Helper to get status for an employee on the selected date
  const getEmployeeStatus = (empId) => {
    const record = attendanceRecords.find(
      r => r.employee._id === empId && r.date.startsWith(selectedDate)
    );
    return record ? record.status : 'Not Marked';
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Attendance Management</h2>
        <div className="d-flex align-items-center bg-white px-3 py-2 rounded-3 border">
          <Calendar size={18} className="text-primary me-2" />
          <input 
            type="date" 
            className="form-control form-control-sm border-0 bg-transparent p-0" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Status ({selectedDate})</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
              ) : employees.length > 0 ? (
                employees.map(emp => {
                  const status = getEmployeeStatus(emp._id);
                  let statusBadge = 'bg-secondary';
                  if (status === 'Present') statusBadge = 'bg-success';
                  if (status === 'Absent') statusBadge = 'bg-danger';
                  if (status === 'Half-Day') statusBadge = 'bg-warning';
                  if (status === 'Leave') statusBadge = 'bg-info';

                  return (
                    <tr key={emp._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>
                            {emp.name.charAt(0)}
                          </div>
                          <div className="fw-medium">{emp.name}</div>
                        </div>
                      </td>
                      <td>{emp.department}</td>
                      <td>
                        <span className={`badge ${statusBadge} bg-opacity-10 text-${statusBadge.replace('bg-', '')} rounded-pill px-3 py-2`}>
                          {status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group" role="group">
                          <button 
                            type="button" 
                            className={`btn btn-sm ${status === 'Present' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => markAttendance(emp._id, 'Present')}
                          >
                            <CheckCircle size={16} className="me-1" /> Present
                          </button>
                          <button 
                            type="button" 
                            className={`btn btn-sm ${status === 'Half-Day' ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={() => markAttendance(emp._id, 'Half-Day')}
                          >
                            <Clock size={16} className="me-1" /> Half-Day
                          </button>
                          <button 
                            type="button" 
                            className={`btn btn-sm ${status === 'Absent' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => markAttendance(emp._id, 'Absent')}
                          >
                            <XCircle size={16} className="me-1" /> Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr><td colSpan="4" className="text-center py-5 text-muted">No active employees found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
