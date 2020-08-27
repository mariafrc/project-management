import { Injectable } from '@nestjs/common';
import {LoginDto, RegisterDto} from './dto/auth.dto'
import {UserService} from '../user/user.service'
import * as bcrypt from 'bcryptjs'
import {User} from '../user/interface/user.interface'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService){}

	async verifyUser(credentials: LoginDto):Promise<{message: string, error: boolean, user?: User}>{
		const user: User = await this.userService.findOne(credentials.username)

		if(!user)
			return {message: "user not found", error: true}

		if(!bcrypt.compareSync(credentials.password, user.password))
			return {message: "wrong password", error: true}

		return {message: "success", error: false, user}
	}

	register(credentials: RegisterDto){
		return this.userService.createUser(credentials)
	}
}
