import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as AuthActions from './auth.actions';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '~services/user/user.service';

@Injectable()
export class AuthEffects {

  authenticate$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AuthActions.LOGIN_PAGE_AUTHENTICATE),
      concatMap(({credentials}) =>
        this.http.post<{id: number, username: string, access_token: string}>('/login', credentials)
          .pipe(
            map((data) => {
              localStorage.setItem('token', data.access_token);
              this.router.navigate(['/app']);
              return AuthActions.AUTHENTICATION_SUCCESS({data});
            }),
            catchError((error) => of(AuthActions.AUTHENTICATION_FAIL({error})) )
          )
      )
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AuthActions.REGISTER_PAGE_REGISTER),
      concatMap(({credentials}) =>
        this.http.post('/users', credentials)
          .pipe(
            map(() => {
              this.router.navigate(['/login']);
              return AuthActions.REGISTER_SUCCESS();
            }),
            catchError((error) => of(AuthActions.REGISTER_FAIL({error})) )
          )
      )
    );
  });

  loadUser$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AuthActions.APP_COMPONENT_LOAD_USER),
      concatMap(() =>
        this.userService.loadUser()
          .pipe(
            map((user) => AuthActions.LOAD_USER_SUCCESS({user})),
            catchError(() => of(AuthActions.LOAD_USER_FAIL()) )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

}
