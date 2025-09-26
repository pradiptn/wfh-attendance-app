import { Controller, Get, Post, Body, Headers, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { notes?: string },
    @Headers('authorization') auth: string
  ) {
    return this.attendanceService.create(file, body.notes, auth);
  }

  @Get()
  async getAll(@Query('userId') userId: number, @Headers('authorization') auth: string) {
    return this.attendanceService.getAll(userId, auth);
  }

  @Get('dashboard')
  async getDashboard(@Headers('authorization') auth: string) {
    return this.attendanceService.getDashboard(auth);
  }
}
