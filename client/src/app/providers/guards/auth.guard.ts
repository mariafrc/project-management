import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {UserService} from '../services/user/user.service';
import { Store } from '@ngrx/store';
import {AppState} from '../../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
    private userService: UserService,
    private store: Store<AppState>
  ){}

  canActivate(): boolean{
    if(this.userService.isAuth())
	    return true;

    this.store.dispatch({type: '[Auth Guard Page] Logout'});
  	return false;
  }
  
}
