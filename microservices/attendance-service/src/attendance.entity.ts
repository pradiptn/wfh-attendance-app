import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  timestamp: Date;
}
