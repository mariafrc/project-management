import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'server/entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/user.dto';
import { Project } from '~entity/project.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>){}

	findOne(userId: number): Promise<User | null>{
		return this.userRepository.findOne(userId);
	}

	findByName(username: string): Promise<User | null>{
		return this.userRepository.findOne({username});
	}

	async findProjects(userId: number): Promise<Project[]>{
        const user = await this.userRepository.findOne(userId, {relations: ['projects']});
        return user.projects;
    }

    async findOneProject(userId: number, projectId: number): Promise<Project>{
        const user = await this.userRepository.findOne(userId, {relations: ['projects']});
        return user.projects.find(p => p.id === projectId);
    }

	createUser(userData: AddUserDto): Promise<User>{
		const user = this.userRepository.create({
			...userData,
			id: null,
			password: bcrypt.hashSync(userData.password, 14),
		})
		return this.userRepository.save(user);
	}

	async changeName(id: number, username: string): Promise<User>{
		await this.userRepository.update(id, {username});
		return this.userRepository.findOne(id);
	}

	async changePassword(id: number, password: string): Promise<User>{
		await this.userRepository.update(id, {password});
		return this.userRepository.findOne(id);
	}

	async isValid(id: number, password: string): Promise<boolean>{
		const user = await this.userRepository.findOne(id);
		return bcrypt.compareSync(password, user.password);
	}

	async deleteUser(id: number): Promise<User>{
		const user = await this.userRepository.findOne(id);
		return this.userRepository.remove(user);
	}
}
