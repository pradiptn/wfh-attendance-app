import React, { useEffect, useState } from 'react';
import { attendanceAPI } from '../services/api';

interface DashboardStats {
  totalEmployees: number;
  totalAttendances: number;
  todayAttendances: number;
  recentAttendances: Array<{
    id: number;
    user: { name: string };
    createdAt: string;
    photoPath: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await attendanceAPI.getDashboard();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2><i className="bi bi-speedometer2"></i> Admin Dashboard</h2>
      
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{stats.totalEmployees}</h4>
                  <p>Total Employees</p>
                </div>
                <i className="bi bi-people display-4"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{stats.todayAttendances}</h4>
                  <p>Today's Attendance</p>
                </div>
                <i className="bi bi-calendar-check display-4"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{stats.totalAttendances}</h4>
                  <p>Total Records</p>
                </div>
                <i className="bi bi-graph-up display-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Recent Attendance</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Date</th>
                      <th>Photo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentAttendances.map((attendance) => (
                      <tr key={attendance.id}>
                        <td>{attendance.user?.name}</td>
                        <td>{new Date(attendance.createdAt).toLocaleDateString()}</td>
                        <td>
                          <img
                            src={`http://localhost:3000/uploads/${attendance.photoPath}`}
                            alt="Attendance"
                            className="img-thumbnail"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
