import { Controller, All, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @All('auth/*')
  async authProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest('http://localhost:3001', req, res);
  }

  @All('employees/*')
  async employeeProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest('http://localhost:3002', req, res);
  }

  @All('attendance')
  @UseInterceptors(FileInterceptor('photo'))
  async attendanceProxy(@Req() req: Request, @Res() res: Response, @UploadedFile() file?: Express.Multer.File) {
    if (file) {
      req.body.photo = file;
    }
    return this.gatewayService.proxyRequest('http://localhost:3003', req, res);
  }
}
