import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
