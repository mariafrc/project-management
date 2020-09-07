import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '~services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private userService: UserService,
		private router: Router
	){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    
  	if(!this.userService.isAuth()){
  		this.router.navigate(['/login'])
  		return false;
  	}

    return true;
  }
  
}
