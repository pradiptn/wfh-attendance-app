import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { employeeAPI } from '../services/api';

interface Employee {
  id: number;
  email: string;
  name: string;
  role: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'employee'
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await employeeAPI.update(editingEmployee.id, {
          email: formData.email,
          name: formData.name,
          role: formData.role
        });
        Swal.fire({
          icon: 'success',
          title: 'Employee Updated!',
          text: 'Employee information has been successfully updated.',
          confirmButtonColor: '#198754'
        });
      } else {
        await employeeAPI.create(formData.email, formData.name, formData.password, formData.role);
        Swal.fire({
          icon: 'success',
          title: 'Employee Created!',
          text: 'New employee has been successfully added.',
          confirmButtonColor: '#198754'
        });
      }
      setShowModal(false);
      setEditingEmployee(null);
      setFormData({ email: '', name: '', password: '', role: 'employee' });
      fetchEmployees();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: 'There was an error processing your request. Please try again.',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      email: employee.email,
      name: employee.name,
      password: '',
      role: employee.role
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await employeeAPI.delete(id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Employee has been deleted.',
          confirmButtonColor: '#198754'
        });
        fetchEmployees();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'There was an error deleting the employee.',
          confirmButtonColor: '#dc3545'
        });
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
              <h3 className="card-title mb-0">
                <i className="bi bi-people me-2"></i>Employee Management
              </h3>
              <button 
                className="btn btn-dark"
                onClick={() => {
                  setEditingEmployee(null);
                  setFormData({ email: '', name: '', password: '', role: 'employee' });
                  setShowModal(true);
                }}
              >
                <i className="bi bi-plus-circle me-1"></i>Add Employee
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td><strong>{employee.name}</strong></td>
                        <td>{employee.email}</td>
                        <td>
                          <span className={`badge ${employee.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                            {employee.role}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(employee)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(employee.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  {!editingEmployee && (
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingEmployee ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
