import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {
  AuthCredentials,
  UserService,
} from 'src/app/akita-store/user/user.service';
import { UserQuery } from 'src/app/akita-store/user/user.query';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private userService: UserService,
    private userQuery: UserQuery
  ) {
    this.error$ = this.userQuery.loginError$;
    this.isLoading$ = this.userQuery.isLoading$;
  }

  ngOnInit(): void {
    if (this.userService.isAuth()) {
      this.router.navigate(['/app/projects']);
    }
    this.userService.resetErrors();
  }

  onSubmit(credentials: AuthCredentials) {
    this.userService.authenticate(credentials);
  }
}
