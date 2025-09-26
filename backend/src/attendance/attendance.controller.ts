import { Controller, Post, Get, UseGuards, Request, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
@UseGuards(AuthGuard('jwt'))
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createAttendance(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { notes?: string }
  ) {
    return this.attendanceService.createAttendance(
      req.user.userId,
      file.path,
      body.notes
    );
  }

  @Get()
  async getAttendances(@Request() req) {
    const userId = req.user.role === 'admin' ? undefined : req.user.userId;
    return this.attendanceService.getAttendances(userId);
  }

  @Get('dashboard')
  async getDashboardStats(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new Error('Access denied');
    }
    return this.attendanceService.getDashboardStats();
  }
}
