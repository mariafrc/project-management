import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
	constructor(
		private userService: UserService, 
		private router: Router
	){}

  canActivate(): boolean {
    const userData = this.userService.getUserdata();
  	if(userData.role === 'user')
	    return true;

	  this.router.navigate(['/redirect']);
	  return false;
  }

}
