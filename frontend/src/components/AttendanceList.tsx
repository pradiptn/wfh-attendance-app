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

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await attendanceAPI.getAll();
      setAttendances(response.data);
    } catch (error) {
      console.error('Failed to fetch attendances');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h2>Attendance Records</h2>
      {attendances.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <div>
          {attendances.map((attendance) => (
            <div key={attendance.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
              <h4>{attendance.user.name} ({attendance.user.email})</h4>
              <p><strong>Time:</strong> {new Date(attendance.timestamp).toLocaleString()}</p>
              {attendance.notes && <p><strong>Notes:</strong> {attendance.notes}</p>}
              <p><strong>Photo:</strong> {attendance.photoPath}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
