import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {selectUserRole} from '../../store/user/user.selectors';
import {AppState} from '../../store';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
	
	userRole$:  Observable<string>;
  constructor(
  	private store: Store<AppState>,
  	private router: Router
  ) {
    this.userRole$ = store.pipe(select(selectUserRole));
  }

  ngOnInit(): void {
  	const subs = this.userRole$.subscribe((role)=>{
  		switch(role){
  			case 'user': this.router.navigate(['/user']);
  			break;

  			default: this.store.dispatch({type: '[Redirect Page] Logout'});
  		}
  	});

  	subs.unsubscribe();
  }

}
