import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Post()
  create(@Body() employeeData: any) {
    return this.employeeService.create(employeeData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() employeeData: any) {
    return this.employeeService.update(+id, employeeData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
