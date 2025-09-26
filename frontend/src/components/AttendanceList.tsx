import React, { useEffect } from 'react';
import { useAttendanceStore } from '../stores/attendanceStore';
import { useAuthStore } from '../stores/authStore';

const AttendanceList: React.FC = () => {
  const { attendances, loading, fetchAttendances } = useAttendanceStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const userId = user?.role === 'admin' ? undefined : user?.id;
    fetchAttendances(userId);
  }, [fetchAttendances, user]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4><i className="bi bi-list-ul"></i> Attendance Records</h4>
        </div>
        <div className="card-body">
          {attendances.length === 0 ? (
            <div className="text-center text-muted">
              <i className="bi bi-inbox display-1"></i>
              <p>No attendance records found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    {user?.role === 'admin' && <th>Employee</th>}
                    <th>Photo</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {attendances.map((attendance) => (
                    <tr key={attendance.id}>
                      <td>{new Date(attendance.date).toLocaleDateString()}</td>
                      <td>{attendance.time}</td>
                      {user?.role === 'admin' && (
                        <td>{attendance.user?.name || 'Unknown'}</td>
                      )}
                      <td>
                        <img
                          src={`http://localhost:3000/uploads/${attendance.photo}`}
                          alt="Attendance"
                          className="img-thumbnail"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{attendance.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
