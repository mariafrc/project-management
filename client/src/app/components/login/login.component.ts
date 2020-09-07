import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import { Observable } from 'rxjs';

import {State} from '~store/index';
import * as AuthActions from '~store/auth/auth.actions';
import {selectLoginError, selectAuthStatus} from '~store/auth/auth.selectors';
import {Credentials} from '~store/auth/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	error$: Observable<string>;
  authStatus$: Observable<boolean>
  constructor(
  	private store: Store<State>,
    private router: Router
  ) {
    this.authStatus$ = store.pipe(select(selectAuthStatus));
  	this.error$ = store.pipe(select(selectLoginError));
  }

  ngOnInit(): void {
    this.authStatus$.subscribe((isAuth) => {
      if(isAuth){
        this.router.navigate(['/app']);
      }
    }).unsubscribe()

  	this.store.dispatch(AuthActions.LOGIN_PAGE_RESET_ERROR());
  }

  onSubmit(credentials: Credentials){
  	this.store.dispatch(AuthActions.LOGIN_PAGE_AUTHENTICATE({credentials}));
  }

}
