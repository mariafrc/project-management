import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Project } from "./project.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({nullable: false})
    @ApiProperty()
    username: string;

    @Column({nullable: false})
    @Exclude()
    password: string;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
}
