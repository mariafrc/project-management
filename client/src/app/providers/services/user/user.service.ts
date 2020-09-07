import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-js-decode';
import {Observable} from 'rxjs';

export interface UserData{
  sub: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuth(): boolean{
    if(!localStorage.getItem('token'))
      return false;

    const jwtPayload = jwtDecode(localStorage.getItem('token')).payload;
    //token expiration check
    if(!jwtPayload.exp)
      return false;

    const date = new Date(0);
    const timeExp = date.setUTCSeconds(jwtPayload.exp);
    if(timeExp.valueOf() < new Date().valueOf()){
      localStorage.removeItem('token');
      return false;
    }

    return true;
  }

  getUserdata(): UserData{
    if(!this.isAuth()){
      return {
        sub: 0,
        username: null
      };
    }

    const jwtPayload = jwtDecode(localStorage.getItem('token')).payload;
    return {
      sub: jwtPayload.sub,
      username: jwtPayload.username
    };
  }

  loadUser(): Observable<UserData>{
    return new Observable((obs)=>{
      if(!this.getUserdata().sub){
        obs.error()
      }
      obs.next(this.getUserdata());
      obs.complete();
    });
  }
}
