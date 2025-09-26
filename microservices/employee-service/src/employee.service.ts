import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({ where: { id } });
  }

  create(employeeData: any) {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employeeData: any) {
    await this.employeeRepository.update(id, employeeData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.employeeRepository.delete(id);
    return { deleted: true };
  }
}
