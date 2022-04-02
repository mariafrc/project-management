import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOne(userId: string): Promise<User | null> {
    return this.userRepository.findOne(userId);
  }

  findByName(username: string): Promise<User | null> {
    return this.userRepository.findOne({ username });
  }

  createUser(username: string, password: string): Promise<User> {
    const user = this.userRepository.create({
      username,
      password: bcrypt.hashSync(password, 14),
    });
    return this.userRepository.save(user);
  }

  async changeName(id: string, username: string): Promise<User> {
    await this.userRepository.update(id, { username });
    return this.userRepository.findOne(id);
  }

  async changePassword(id: string, password: string): Promise<User> {
    await this.userRepository.update(id, { password });
    return this.userRepository.findOne(id);
  }

  async isValid(id: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne(id);
    return bcrypt.compareSync(password, user.password);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
