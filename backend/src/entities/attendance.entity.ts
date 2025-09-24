import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.attendances)
  user: User;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  photoPath: string;

  @Column({ nullable: true })
  notes: string;
}
