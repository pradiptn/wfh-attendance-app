import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { EmployeeModule } from './employee/employee.module';
import { User } from './entities/user.entity';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'wfh_attendance',
      entities: [User, Attendance],
      synchronize: true,
    }),
    AuthModule,
    AttendanceModule,
    EmployeeModule,
  ],
})
export class AppModule {}
