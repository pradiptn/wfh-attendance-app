import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.attendanceService.findAll(userId ? +userId : undefined);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(@Body() attendanceData: any, @UploadedFile() file: Express.Multer.File) {
    return this.attendanceService.create(attendanceData, file);
  }
}
