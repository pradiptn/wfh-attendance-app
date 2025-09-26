import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  async login(credentials: any) {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    if (user && await bcrypt.compare(credentials.password, user.password)) {
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      };
    }
    throw new Error('Invalid credentials');
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new Error('Invalid token');
    }
  }
}
