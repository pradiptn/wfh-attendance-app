import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'attendance_db',
      entities: [Attendance],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Attendance]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AppModule {}
