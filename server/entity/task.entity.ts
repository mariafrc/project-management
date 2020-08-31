import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./project.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    status: string;

    @Column({nullable: true, update: false})
    @ApiProperty()
    projectId: number;

    @ManyToOne(()=> Project, (project) => project.tasks, {nullable: false, onDelete: "CASCADE"})
    @Exclude()
    project: Project;
}