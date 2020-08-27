import {IsNotEmpty, IsString} from 'class-validator'

export class AddProductDto{
	@IsNotEmpty()
	@IsString()
	name: string
}