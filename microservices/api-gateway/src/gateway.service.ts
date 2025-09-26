import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Injectable()
export class GatewayService {
  async proxyRequest(targetUrl: string, req: Request, res: Response) {
    try {
      const response = await axios({
        method: req.method,
        url: `${targetUrl}${req.url}`,
        data: req.body,
        headers: {
          ...req.headers,
          host: undefined,
        },
        params: req.query,
      });

      res.status(response.status).json(response.data);
    } catch (error: any) {
      const status = error.response?.status || 500;
      const data = error.response?.data || { message: 'Internal server error' };
      res.status(status).json(data);
    }
  }
}
