import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { LoginOutput } from './dto/LoginOutput';
import { RegisterInput } from './dto/RegisterInput.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByName(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  login(user: User): LoginOutput {
    const tokenPayload = { username: user.username, sub: user.id };
    const token = sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });

    return {
      id: user.id,
      username: user.username,
      access_token: token,
    };
  }

  async register(registerInput: RegisterInput) {
    const { username, password } = registerInput;
    const user = await this.usersService.createUser(username, password);
    return this.login(user);
  }
}
