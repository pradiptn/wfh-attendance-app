import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  findAll(userId?: number) {
    const where = userId ? { userId } : {};
    return this.attendanceRepository.find({ where, order: { timestamp: 'DESC' } });
  }

  create(attendanceData: any, file?: Express.Multer.File) {
    const attendance = this.attendanceRepository.create({
      ...attendanceData,
      photo: file?.filename,
    });
    return this.attendanceRepository.save(attendance);
  }
}
