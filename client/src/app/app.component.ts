import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';
import * as AuthActions from '~store/auth/auth.actions'; 
import {State} from '~store/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private store: Store<State>){}
  
  ngOnInit(){
  	this.store.dispatch(AuthActions.APP_COMPONENT_LOAD_USER());
  }
}
