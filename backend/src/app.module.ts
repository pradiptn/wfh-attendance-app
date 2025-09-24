import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { User } from './entities/user.entity';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'wfh_attendance',
      entities: [User, Attendance],
      synchronize: true,
    }),
    AuthModule,
    AttendanceModule,
  ],
})
export class AppModule {}
