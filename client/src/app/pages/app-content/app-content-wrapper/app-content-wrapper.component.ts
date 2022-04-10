import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/akita-store/project/project.service';
import { UserQuery } from 'src/app/akita-store/user/user.query';
import { UserService } from 'src/app/akita-store/user/user.service';

@Component({
  selector: 'app-app-content-wrapper',
  templateUrl: './app-content-wrapper.component.html',
  styleUrls: ['./app-content-wrapper.component.scss'],
})
export class AppContentWrapperComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private userQuery: UserQuery
  ) {}

  ngOnInit(): void {
    this.userService.loadUser();
    this.userQuery.user$.subscribe((user) => {
      if (user) {
        this.projectService.loadProjects(user.id);
      }
    });
  }
}
