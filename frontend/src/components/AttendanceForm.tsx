import React, { useState } from 'react';
import { attendanceAPI } from '../services/api';

const AttendanceForm: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      alert('Please select a photo');
      return;
    }

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('notes', notes);

    try {
      await attendanceAPI.create(formData);
      alert('Attendance recorded successfully!');
      setPhoto(null);
      setNotes('');
    } catch (error) {
      alert('Failed to record attendance');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <h2>Record Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Notes (optional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about your work..."
            style={{ width: '100%', padding: '8px', height: '80px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
          Record Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
