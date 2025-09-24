import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';
import './App.css';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'attendance' | 'records'>('attendance');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd validate the token with the backend
      // For now, we'll just check if it exists
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>WFH Attendance System</h1>
          <div>
            <span style={{ marginRight: '20px' }}>Welcome, {user.name}!</span>
            <button onClick={() => setCurrentView('attendance')} style={{ marginRight: '10px' }}>
              Record Attendance
            </button>
            <button onClick={() => setCurrentView('records')} style={{ marginRight: '10px' }}>
              View Records
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
      
      <main>
        {currentView === 'attendance' ? <AttendanceForm /> : <AttendanceList />}
      </main>
    </div>
  );
}

export default App;
