import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-js-decode';
import {Observable} from 'rxjs';

interface LoadResponse{
  id: string
  username: string
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
    const decoded = jwtDecode(localStorage.getItem('token')).payload;
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

  getUserdata(): LoadResponse{
    if(!this.isAuth()){
      return {
        id: null,
        username: null,
        isAuth: false
      };
    }
    const decoded = jwtDecode(localStorage.getItem('token')).payload;
    return {
      id: decoded.id,
      username: decoded.username,
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
