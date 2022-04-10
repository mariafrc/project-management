import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserState, UserStore } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store);
  }

  loginError$ = this.select((state) => state.loginError);
  registerError$ = this.select((state) => state.registerError);
  user$ = this.select((state) => state.user);
  isLoading$ = this.select((state) => state.isLoading);
}
