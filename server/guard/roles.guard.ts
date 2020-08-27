import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class RolesGuard implements CanActivate {
	role: string
	constructor(role: 'student' | 'admin'){
		this.role = role
	}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if(!request.userData || request.userData.role !== this.role){
    	return false
    }

    return true
  }
}