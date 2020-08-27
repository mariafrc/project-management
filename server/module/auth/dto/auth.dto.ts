import {IsString, IsNotEmpty, IsIn} from 'class-validator'

export class LoginDto{
	@IsString()
	@IsNotEmpty()
	username: string

	@IsString()
	@IsNotEmpty()
	password: string
}

export class RegisterDto{
	@IsString()
	@IsNotEmpty()
	username: string

	@IsString()
	@IsNotEmpty()
	password: string
}