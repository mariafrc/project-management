import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../project/project.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Project, (project) => project.user, { onDelete: 'CASCADE' })
  projects: Project[];
}
