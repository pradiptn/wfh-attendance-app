import React, { useState } from 'react';
import { authAPI } from '../services/api';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await authAPI.register(email, password, name);
        alert('Registration successful! Please login.');
        setIsRegister(false);
      } else {
        const response = await authAPI.login(email, password);
        localStorage.setItem('token', response.data.access_token);
        onLogin(response.data.user);
      }
    } catch (error) {
      alert('Authentication failed');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-12 col-md-6 col-lg-4 mx-auto">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                {isRegister ? 'Create Account' : 'Welcome Back'}
              </h2>
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {isRegister ? 'Create Account' : 'Sign In'}
                </button>
              </form>
              <div className="text-center">
                <span className="text-muted">
                  {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="btn btn-link p-0"
                >
                  {isRegister ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
