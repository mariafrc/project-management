import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import {AuthService} from './auth.service'
import {LoginDto, RegisterDto} from './dto/auth.dto'
import {RegisterValidationPipe} from './pipe/register-validation.pipe'
import * as jwt from 'jsonwebtoken'

@Controller('api')
export class AuthController {
	constructor(private readonly authService: AuthService){}

	private createToken(user){
		const data = {
			username: user.username,
			role: user.role
		}
		return jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: '1d'})
	}

	@Post('login')
	async login(@Body() credentials: LoginDto){
		let result = await this.authService.verifyUser(credentials)
		if(result.error)
			throw new BadRequestException(result.message)

		return {
			username: result.user.username,
			role: result.user.role,
			token: this.createToken(result.user)
		}
	}

	@Post('register')
	async register(@Body(RegisterValidationPipe) credentials: RegisterDto){
		const user = await this.authService.register(credentials)
		return {
			username: user.username,
			role: user.role,
			token: this.createToken(user)
		}
	}
}
