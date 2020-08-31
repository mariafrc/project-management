import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { User } from "./user.entity";
import { Task } from "./task.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column({ nullable: true })
    @ApiProperty()
    userId: number;

    @ManyToOne(() => User, (user) => user.projects, {nullable: false, onDelete: "CASCADE"})
    @Exclude()
    user: User;

    @OneToMany(() => Task, (task)=> task.project)
    tasks: Task[]
}
