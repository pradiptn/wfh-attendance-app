import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository = app.get(getRepositoryToken(User));

  const adminExists = await userRepository.findOne({ where: { email: 'admin@company.com' } });
  
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = userRepository.create({
      email: 'admin@company.com',
      password: hashedPassword,
      name: 'System Admin',
      role: 'admin',
    });
    await userRepository.save(admin);
    console.log('Admin user created: admin@company.com / admin123');
  } else {
    console.log('Admin user already exists');
  }

  await app.close();
}

seedAdmin();
