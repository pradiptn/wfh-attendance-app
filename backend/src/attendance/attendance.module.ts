import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from '../entities/attendance.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, User]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
