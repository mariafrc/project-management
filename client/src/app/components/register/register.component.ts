import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {selectAuthStatus, selectError} from '../../store/user/user.selectors';
import {AppState} from '../../store';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	isAuth$:  Observable<boolean>;
  error$: Observable<string>;
  constructor(
  	private store: Store<AppState>,
  	private router: Router
  ) {
    this.isAuth$ = store.pipe(select(selectAuthStatus)),
    this.error$ = store.pipe(select(selectError));
  }

  ngOnInit(): void {
  	const subs = this.isAuth$.subscribe((authStat)=>{
  		if(authStat)
  			this.router.navigate(['/redirect']);
  	});

  	subs.unsubscribe();
    this.store.dispatch({type: '[Register Page] Clear Error'});
  }

  onRegister(value): void{
    this.store.dispatch({type: '[Register Page] Register', ...value});
  }

}
