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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        )}
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Login;
