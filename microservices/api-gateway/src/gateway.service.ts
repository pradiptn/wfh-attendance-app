import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Injectable()
export class GatewayService {
  async proxyRequest(serviceUrl: string, req: Request, res: Response) {
    try {
      const url = `${serviceUrl}${req.url}`;
      const response = await axios({
        method: req.method as any,
        url,
        data: req.body,
        headers: {
          ...req.headers,
          host: undefined,
        },
      });
      
      res.status(response.status).json(response.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data || 'Service unavailable';
      res.status(status).json(message);
    }
  }
}
