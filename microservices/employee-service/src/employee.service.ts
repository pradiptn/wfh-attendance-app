import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import * as bcrypt from 'bcryptjs';
import axios from 'axios';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  private async verifyAdmin(authHeader: string) {
    try {
      const token = authHeader?.replace('Bearer ', '');
      const response = await axios.post('http://auth-service:3001/auth/verify', { token });
      if (!response.data.valid || response.data.user.role !== 'admin') {
        throw new HttpException('Access denied', 403);
      }
      return response.data.user;
    } catch {
      throw new HttpException('Unauthorized', 401);
    }
  }

  async getAll(authHeader: string) {
    await this.verifyAdmin(authHeader);
    return this.employeeRepository.find();
  }

  async create(data: { name: string; email: string; password: string; role?: string }, authHeader: string) {
    await this.verifyAdmin(authHeader);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const employee = this.employeeRepository.create({
      ...data,
      password: hashedPassword,
      role: data.role || 'employee',
    });
    return this.employeeRepository.save(employee);
  }

  async update(id: number, data: any, authHeader: string) {
    await this.verifyAdmin(authHeader);
    await this.employeeRepository.update(id, data);
    return this.employeeRepository.findOne({ where: { id } });
  }

  async delete(id: number, authHeader: string) {
    await this.verifyAdmin(authHeader);
    return this.employeeRepository.delete(id);
  }
}
