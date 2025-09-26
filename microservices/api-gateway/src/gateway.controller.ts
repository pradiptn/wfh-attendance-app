import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  private getServiceUrl(service: string, port: number): string {
    const host = process.env.NODE_ENV === 'production' ? service : 'localhost';
    return `http://${host}:${port}`;
  }

  @All('auth/*')
  async authProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest(this.getServiceUrl('auth-service', 3001), req, res);
  }

  @All('employees/*')
  async employeeProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest(this.getServiceUrl('employee-service', 3002), req, res);
  }

  @All('employees')
  async employeeProxyRoot(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest(this.getServiceUrl('employee-service', 3002), req, res);
  }

  @All('attendance/*')
  async attendanceProxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest(this.getServiceUrl('attendance-service', 3003), req, res);
  }

  @All('attendance')
  async attendanceProxyRoot(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.proxyRequest(this.getServiceUrl('attendance-service', 3003), req, res);
  }
}
