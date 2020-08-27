import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void{
  	this.store.dispatch({type: '[App Component] Load User'});
  }

  // onLogout(){
  //   this.store.dispatch({type: '[Menu Page] Logout'})
  // }
}
