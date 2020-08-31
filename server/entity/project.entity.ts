import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { User } from "./user.entity";
import { Task } from "./task.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.projects, {nullable: false, onDelete: "CASCADE"})
    user: User;

    @OneToMany(() => Task, (task)=> task.project)
    tasks: Task[]
}
