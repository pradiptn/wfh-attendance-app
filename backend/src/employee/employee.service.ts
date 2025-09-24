import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllEmployees() {
    return this.userRepository.find({
      select: ['id', 'email', 'name', 'role'],
    });
  }

  async createEmployee(email: string, name: string, password: string, role: string = 'employee') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(employee);
  }

  async updateEmployee(id: number, updateData: { email?: string; name?: string; role?: string }) {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ 
      where: { id },
      select: ['id', 'email', 'name', 'role']
    });
  }

  async deleteEmployee(id: number) {
    return this.userRepository.delete(id);
  }
}
