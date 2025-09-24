import React, { useState } from 'react';
import { attendanceAPI } from '../services/api';

const AttendanceForm: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      alert('Please select a photo');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('notes', notes);

    try {
      await attendanceAPI.create(formData);
      alert('Attendance recorded successfully!');
      setPhoto(null);
      setNotes('');
      // Reset file input
      const fileInput = document.getElementById('photo') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      alert('Failed to record attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-camera me-2"></i>Record Attendance
              </h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="photo" className="form-label fw-bold">
                    Upload Work Photo <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    required
                  />
                  <div className="form-text">
                    Please upload a photo showing you're working from home
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="notes" className="form-label fw-bold">
                    Work Notes (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe what you're working on today..."
                  />
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Recording...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Record Attendance
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
