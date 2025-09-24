import React, { useState, useEffect } from 'react';
import { attendanceAPI } from '../services/api';

interface Attendance {
  id: number;
  timestamp: string;
  photoPath: string;
  notes: string;
  user: {
    name: string;
    email: string;
  };
}

const AttendanceList: React.FC = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await attendanceAPI.getAll();
      setAttendances(response.data);
    } catch (error) {
      console.error('Failed to fetch attendances');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading attendance records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-info text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-list-ul me-2"></i>Attendance Records
              </h3>
            </div>
            <div className="card-body p-0">
              {attendances.length === 0 ? (
                <div className="text-center p-5">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">No Records Found</h4>
                  <p className="text-muted">No attendance records have been submitted yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Employee</th>
                        <th>Date & Time</th>
                        <th>Notes</th>
                        <th>Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendances.map((attendance) => (
                        <tr key={attendance.id}>
                          <td>
                            <div>
                              <strong>{attendance.user.name}</strong>
                              <br />
                              <small className="text-muted">{attendance.user.email}</small>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary">
                              {new Date(attendance.timestamp).toLocaleDateString()}
                            </span>
                            <br />
                            <small className="text-muted">
                              {new Date(attendance.timestamp).toLocaleTimeString()}
                            </small>
                          </td>
                          <td>
                            {attendance.notes ? (
                              <span className="text-wrap">{attendance.notes}</span>
                            ) : (
                              <span className="text-muted fst-italic">No notes</span>
                            )}
                          </td>
                          <td>
                            <span className="badge bg-success">
                              <i className="bi bi-image me-1"></i>
                              Photo uploaded
                            </span>
                            <br />
                            <small className="text-muted">{attendance.photoPath}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
