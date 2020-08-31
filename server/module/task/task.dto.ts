import { IsString, IsNotEmpty, IsNumber, IsIn } from "class-validator";

export class AddTaskDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    project: number;
}

export class UpdateTaskDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['waiting', 'processing', 'finished'])
    status: string;
}