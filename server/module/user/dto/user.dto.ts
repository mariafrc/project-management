import {IsString, IsNotEmpty } from 'class-validator'

export class AddUserDto{
	@IsString()
	@IsNotEmpty()
	username: string
	
	@IsString()
	@IsNotEmpty()
	password: string
}

export class ChangeNameDto{
	@IsString()
	@IsNotEmpty()
	username: string
}

export class ChangePasswordDto{
	@IsString()
	@IsNotEmpty()
	lastPassword: string

	@IsString()
	@IsNotEmpty()
	newPassword: string
}