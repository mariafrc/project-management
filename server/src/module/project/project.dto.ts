import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpsertProjectDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    user: number;
}

export class ChangeTitleDto{
    @IsString()
    @IsNotEmpty()
    title: string;
}