import { Injectable } from '@nestjs/common';
import { UserService } from '~module/user/user.service';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService
    ) {}

    async validateUser(username: string, password: string): Promise<{id: number, username: string} | null> {
        const user = await this.usersService.findByName(username);
        if (user && bcrypt.compareSync(password, user.password) ){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: {id: number, username: string} ): {id: number, username: string, access_token: string}{
        const payload = { username: user.username, sub: user.id };
        return {
            id: user.id,
            username: user.username, 
            access_token: sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1d'})
        };
    }
}
