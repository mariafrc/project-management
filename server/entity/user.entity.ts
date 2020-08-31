import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
}
