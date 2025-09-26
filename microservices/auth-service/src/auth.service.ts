import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const adminExists = await this.userRepository.findOne({ where: { role: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = this.userRepository.create({
        email: 'admin@wfh.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      });
      await this.userRepository.save(admin);
      console.log('Default admin created: admin@wfh.com / admin123');
    }
  }

  async login(loginDto: { email: string; password: string }) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user || !await bcrypt.compare(loginDto.password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: { email: string; password: string; name: string; role?: string }) {
    const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
      role: registerDto.role || 'employee',
    });

    await this.userRepository.save(user);
    return { message: 'User created successfully' };
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { id: payload.userId } });
      return { valid: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
    } catch {
      return { valid: false };
    }
  }
}
