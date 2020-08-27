import { Injectable } from '@angular/core';
import * as jwtJsDecode from 'jwt-js-decode';
import {Observable} from 'rxjs';

interface LoadResponse{
  username: string
  role: string
  isAuth: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuth(): boolean{
    if(!localStorage.getItem('token'))
      return false;
  
    //token expiration check (this code was stolen)
    const decoded = jwtJsDecode.jwtDecode(localStorage.getItem('token')).payload;
    if(!decoded.exp)
      return false;

    const date = new Date(0);
    const timeExp = date.setUTCSeconds(decoded.exp);
    if(timeExp.valueOf() < new Date().valueOf()){
      localStorage.removeItem('token');
      return false;
    }

    return true;
  }

  getUserdata(): {username: string, role: string, isAuth: boolean}{
    if(!this.isAuth()){
      return {
        username: null,
        role: null,
        isAuth: false
      };
    }
    const decoded = jwtJsDecode.jwtDecode(localStorage.getItem('token')).payload;
    return {
      username: decoded.username,
      role: decoded.role,
      isAuth: true
    };
  }

  loadUser(): Observable<LoadResponse>{
    return new Observable((obs)=>{
      obs.next(this.getUserdata());
      obs.complete();
    });
  }
}
