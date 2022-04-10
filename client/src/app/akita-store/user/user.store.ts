import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UserState {
  user: User;
  loginError: string;
  registerError: string;
  isLoading: boolean;
}

export function createInitialState(): UserState {
  return {
    user: { id: 0, username: '' },
    loginError: '',
    registerError: '',
    isLoading: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
