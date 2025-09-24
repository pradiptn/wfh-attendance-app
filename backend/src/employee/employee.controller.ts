import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeService } from './employee.service';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new Error('Access denied');
    }
    return this.employeeService.getAllEmployees();
  }

  @Post()
  async createEmployee(@Request() req, @Body() body: { email: string; name: string; password: string; role?: string }) {
    if (req.user.role !== 'admin') {
      throw new Error('Access denied');
    }
    return this.employeeService.createEmployee(body.email, body.name, body.password, body.role);
  }

  @Put(':id')
  async updateEmployee(@Request() req, @Param('id') id: number, @Body() body: { email?: string; name?: string; role?: string }) {
    if (req.user.role !== 'admin') {
      throw new Error('Access denied');
    }
    return this.employeeService.updateEmployee(id, body);
  }

  @Delete(':id')
  async deleteEmployee(@Request() req, @Param('id') id: number) {
    if (req.user.role !== 'admin') {
      throw new Error('Access denied');
    }
    return this.employeeService.deleteEmployee(id);
  }
}
