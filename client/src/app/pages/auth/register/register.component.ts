import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserQuery } from 'src/app/akita-store/user/user.query';
import {
  AuthCredentials,
  UserService,
} from 'src/app/akita-store/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error$: Observable<string>;
  authStatus$: Observable<boolean>;
  constructor(
    private router: Router,
    private userService: UserService,
    private userQuery: UserQuery
  ) {
    this.error$ = this.userQuery.registerError$;
  }

  ngOnInit(): void {
    debugger;
    if (this.userService.isAuth()) {
      this.router.navigate(['/app']);
    }
    this.userService.resetErrors();
  }

  onSubmit(credentials: AuthCredentials) {
    this.userService.register(credentials);
  }
}
