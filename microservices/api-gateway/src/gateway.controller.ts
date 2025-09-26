import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @All('auth/*')
  async authProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest('http://auth-service:3001', req, res);
  }

  @All('employees/*')
  async employeeProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest('http://employee-service:3002', req, res);
  }

  @All('employees')
  async employeeProxyRoot(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest('http://employee-service:3002', req, res);
  }

  @All('attendance/*')
  async attendanceProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest('http://attendance-service:3003', req, res);
  }

  @All('attendance')
  async attendanceProxyRoot(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest('http://attendance-service:3003', req, res);
  }
}
