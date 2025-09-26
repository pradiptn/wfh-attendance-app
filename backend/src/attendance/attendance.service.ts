import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAttendance(userId: number, photoPath: string, notes?: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const attendance = this.attendanceRepository.create({
      user,
      photoPath,
      notes,
    });
    return this.attendanceRepository.save(attendance);
  }

  async getAttendances(userId?: number) {
    const query = this.attendanceRepository.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.user', 'user');
    
    if (userId) {
      query.where('attendance.user.id = :userId', { userId });
    }
    
    return query.getMany();
  }

  async getDashboardStats() {
    const totalEmployees = await this.userRepository.count();
    const totalAttendances = await this.attendanceRepository.count();
    
    const today = new Date().toISOString().split('T')[0];
    const todayAttendances = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('DATE(attendance.createdAt) = :today', { today })
      .getCount();

    const recentAttendances = await this.attendanceRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 5
    });

    return {
      totalEmployees,
      totalAttendances,
      todayAttendances,
      recentAttendances
    };
  }
}
