import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AppState } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
  	private breakpointObserver: BreakpointObserver,
  	private store: Store<AppState>
  ) {}

  onLogout(): void{
  	this.store.dispatch({type: '[User Menu] Logout'});
  }

}
