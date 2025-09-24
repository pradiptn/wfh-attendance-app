import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'employee' })
  role: string;

  @OneToMany(() => Attendance, attendance => attendance.user)
  attendances: Attendance[];
}
