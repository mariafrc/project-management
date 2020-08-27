import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import {User} from './interface/user.interface'

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>){}

	findOne(username: string): Promise<User | null>{
		return this.userModel.findOne({username}).exec()
	}

	findOneById(id: string): Promise<User | null>{
		return this.userModel.findOne({_id: id}).exec()
	}

	findAll(): Promise<User[]>{
		return this.userModel.find({role: 'user'}).exec()
	}

	createUser(userData: any): Promise<User>{
		let user = new this.userModel({
			username: userData.username,
			password: bcrypt.hashSync(userData.password, 14),
			role: 'user'/* userData.role */
		})

		return user.save()
	}

	deleteUser(id: string): Promise<User>{
		return this.userModel.findOneAndDelete({_id: id}).exec()
	}
}
