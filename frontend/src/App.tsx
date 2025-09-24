import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';
import EmployeeManagement from './components/EmployeeManagement';
import './App.css';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'attendance' | 'records' | 'employees'>('attendance');

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
    <div className="App min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <i className="bi bi-house-door me-2"></i>
            WFH Attendance
          </a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link ${currentView === 'attendance' ? 'active' : ''}`}
                  onClick={() => setCurrentView('attendance')}
                >
                  <i className="bi bi-camera me-1"></i>
                  Record Attendance
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link ${currentView === 'records' ? 'active' : ''}`}
                  onClick={() => setCurrentView('records')}
                >
                  <i className="bi bi-list-ul me-1"></i>
                  View Records
                </button>
              </li>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentView === 'employees' ? 'active' : ''}`}
                    onClick={() => setCurrentView('employees')}
                  >
                    <i className="bi bi-people me-1"></i>
                    Manage Employees
                  </button>
                </li>
              )}
            </ul>
            
            <div className="navbar-nav">
              <div className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text">
                      <small className="text-muted">{user.email}</small>
                    </span>
                  </li>
                  <li>
                    <span className="dropdown-item-text">
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user.role}
                      </span>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pb-4">
        {currentView === 'attendance' && <AttendanceForm />}
        {currentView === 'records' && <AttendanceList />}
        {currentView === 'employees' && user.role === 'admin' && <EmployeeManagement />}
      </main>
    </div>
  );
}

export default App;
