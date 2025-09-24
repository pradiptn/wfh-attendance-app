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
  const [filteredAttendances, setFilteredAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchAttendances();
  }, []);

  useEffect(() => {
    let filtered = attendances;
    
    if (nameFilter) {
      filtered = filtered.filter(att => 
        att.user.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        att.user.email.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    
    if (dateFilter) {
      filtered = filtered.filter(att => 
        new Date(att.timestamp).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }
    
    setFilteredAttendances(filtered);
  }, [attendances, nameFilter, dateFilter]);

  const fetchAttendances = async () => {
    try {
      const response = await attendanceAPI.getAll();
      setAttendances(response.data);
      setFilteredAttendances(response.data);
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
            <div className="card-body">
              {/* Filter Section */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by name or email..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
              </div>
              
              {filteredAttendances.length === 0 ? (
                <div className="text-center p-5">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">No Records Found</h4>
                  <p className="text-muted">
                    {attendances.length === 0 ? 'No attendance records have been submitted yet.' : 'No records match your filter criteria.'}
                  </p>
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
                      {filteredAttendances.map((attendance) => (
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
                            <button 
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => setSelectedPhoto(`http://localhost:3001/${attendance.photoPath}`)}
                            >
                              <i className="bi bi-eye me-1"></i>
                              View Photo
                            </button>
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

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attendance Photo</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setSelectedPhoto(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img 
                  src={selectedPhoto} 
                  alt="Attendance Photo" 
                  className="img-fluid rounded"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
