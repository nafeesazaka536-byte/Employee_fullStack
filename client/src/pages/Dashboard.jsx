import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Briefcase, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import api from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    departments: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/employees');
        
        const activeCount = data.filter(emp => emp.status === 'Active').length;
        const uniqueDepts = new Set(data.map(emp => emp.department)).size;
        
        setStats({
          total: data.length,
          active: activeCount,
          departments: uniqueDepts,
          recentActivity: data.slice(-5).reverse() // Last 5 added
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Dashboard Overview</h2>
        <div className="text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-3">
          <StatCard 
            title="Total Employees" 
            value={stats.total} 
            icon={<Users className="text-primary" />} 
            colorClass="bg-primary bg-opacity-10"
            trend={{ value: '+4%', label: 'from last month', type: 'up' }}
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard 
            title="Active Employees" 
            value={stats.active} 
            icon={<UserCheck className="text-success" />} 
            colorClass="bg-success bg-opacity-10"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard 
            title="Departments" 
            value={stats.departments} 
            icon={<Briefcase className="text-warning" />} 
            colorClass="bg-warning bg-opacity-10"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard 
            title="Avg. Attendance" 
            value="92%" 
            icon={<Activity className="text-info" />} 
            colorClass="bg-info bg-opacity-10"
            trend={{ value: '+2%', label: 'from last week', type: 'up' }}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="glass-card h-100 p-0">
            <div className="p-4 border-bottom">
              <h5 className="fw-bold mb-0">Recent Employees</h5>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentActivity.length > 0 ? stats.recentActivity.map(emp => (
                    <tr key={emp._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-bold">{emp.name}</div>
                            <div className="text-muted small">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{emp.department}</td>
                      <td>{emp.jobTitle}</td>
                      <td>
                        <span className={`badge bg-${emp.status === 'Active' ? 'success' : 'danger'} bg-opacity-10 text-${emp.status === 'Active' ? 'success' : 'danger'} rounded-pill px-3 py-2`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="text-center py-4">No employees found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="glass-card h-100">
            <h5 className="fw-bold mb-4">Quick Actions</h5>
            <div className="d-grid gap-3">
              <a href="/add-employee" className="btn btn-outline-primary text-start p-3 rounded-3 d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-2 rounded me-3 text-primary">
                  <UserCheck size={20} />
                </div>
                <div>
                  <div className="fw-bold">Add Employee</div>
                  <div className="small text-muted border-0">Register a new staff member</div>
                </div>
              </a>
              <a href="/attendance" className="btn btn-outline-success text-start p-3 rounded-3 d-flex align-items-center">
                <div className="bg-success bg-opacity-10 p-2 rounded me-3 text-success">
                  <Activity size={20} />
                </div>
                <div>
                  <div className="fw-bold">Mark Attendance</div>
                  <div className="small text-muted border-0">Daily attendance check-in</div>
                </div>
              </a>
              <a href="/payroll" className="btn btn-outline-warning text-start p-3 rounded-3 d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 p-2 rounded me-3 text-warning">
                  <Briefcase size={20} />
                </div>
                <div>
                  <div className="fw-bold">Generate Payroll</div>
                  <div className="small text-muted border-0">Process monthly salaries</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
