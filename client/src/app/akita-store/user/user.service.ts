import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-js-decode';
import { User } from './user.Model';
import { UserStore } from './user.store';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

export interface AuthCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  id: number;
  username: string;
  access_token: string;
}

const UNAUTHORIZED_HTTP_ERROR = 401;
const BADREQUEST_HTTP_ERROR = 400;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private userStore: UserStore,
    private router: Router
  ) {}

  isAuth(): boolean {
    if (!localStorage.getItem('token')) return false;

    const jwtPayload = jwtDecode(localStorage.getItem('token')).payload;
    //token expiration check
    if (!jwtPayload.exp) return false;

    const date = new Date(0);
    const timeExp = date.setUTCSeconds(jwtPayload.exp);
    if (timeExp.valueOf() < new Date().valueOf()) {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  }

  authenticate(credentials: AuthCredentials) {
    this.userStore.update({ isLoading: true });
    this.http
      .post<AuthResponse>('/login', credentials)
      .pipe(
        catchError((error: any) => {
          let errorMessage = 'Unknown error';
          if (error?.status === UNAUTHORIZED_HTTP_ERROR) {
            errorMessage = 'Username or password invalid';
          }
          this.userStore.update({ loginError: errorMessage, isLoading: false });
          return of(null);
        })
      )
      .subscribe((authResponse) => {
        authResponse && this.loginUser(authResponse);
      });
  }

  register(credentials: AuthCredentials) {
    this.userStore.update({ isLoading: true });
    this.http
      .post<AuthResponse>('/register', credentials)
      .pipe(
        catchError((error: any) => {
          let errorMessage = 'Unknown error';
          if (error?.status === BADREQUEST_HTTP_ERROR) {
            errorMessage = 'Username already exist';
          }
          this.userStore.update({
            registerError: errorMessage,
            isLoading: false,
          });
          return of(null);
        })
      )
      .subscribe((registerResponse) => {
        this.loginUser(registerResponse);
      });
  }

  private loginUser(authResponse: AuthResponse) {
    const { access_token, ...user } = authResponse;

    localStorage.setItem('token', access_token);
    this.userStore.update({ user });

    this.router.navigate(['/app/projects']);
  }

  loadUser() {
    const jwtPayload = jwtDecode(localStorage.getItem('token')).payload;
    this.http.get<User>(`/users/${jwtPayload.sub}`).subscribe((user) => {
      this.userStore.update({ user });
    });
  }

  resetErrors() {
    this.userStore.update({
      loginError: '',
      registerError: '',
      isLoading: false,
    });
  }
}
