import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const bearerHeader = request.headers['authorization']
		if(!bearerHeader)
			return false
		
		const bearer = bearerHeader.split(' ')
		const bearerToken = bearer[1]
		
		try{
			const result = await jwt.verify(bearerToken, process.env.TOKEN_SECRET)
			request.userData = {
				username: result.username
			}
		}
		catch(err){
			return false
		}

    return true
  }
}