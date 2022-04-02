import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  userId: string;

  @Exclude()
  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Task, (task) => task.project, { onDelete: 'CASCADE' })
  tasks: Task[];
}
