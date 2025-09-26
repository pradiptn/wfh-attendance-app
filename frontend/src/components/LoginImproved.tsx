import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { loginSchema, registerSchema, LoginForm, RegisterForm } from '../schemas/validationSchemas';
import { authAPI } from '../services/api';
import Swal from 'sweetalert2';

const LoginImproved: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState<LoginForm & Partial<RegisterForm>>({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = isRegister ? registerSchema : loginSchema;
      const validData = schema.parse(formData);

      if (isRegister) {
        await authAPI.register(validData);
        Swal.fire('Success', 'Registration successful! Please login.', 'success');
        setIsRegister(false);
      } else {
        const response = await authAPI.login(validData);
        login(response.data.user, response.data.token);
        Swal.fire('Success', 'Login successful!', 'success');
      }
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">
                {isRegister ? 'Register' : 'Login'}
              </h3>
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                )}
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {isRegister ? 'Register' : 'Login'}
                </button>
              </form>
              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginImproved;
