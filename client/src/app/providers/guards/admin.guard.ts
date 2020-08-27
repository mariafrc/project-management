import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	constructor(
		private userService: UserService, 
		private router: Router
	){}

  canActivate(): boolean {
    const userData = this.userService.getUserdata();
  	if(userData.role === 'admin')
	    return true;
	  
  	this.router.navigate(['/redirect']);
  	return false;
  }
  
}
