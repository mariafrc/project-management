import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ProjectService } from 'src/app/akita-store/project/project.service';
import { UserQuery } from 'src/app/akita-store/user/user.query';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  projectId: number;
  title: string;
  userId: number;
  subSink = new SubSink();
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private projectService: ProjectService,
    private userQuery: UserQuery
  ) {}

  ngOnInit(): void {
    this.subSink.add(
      this.userQuery.user$.subscribe((user) => {
        if (user) {
          this.userId = user.id;
        }
      })
    );

    if (this.config.data.action === 'add') {
      this.title = '';
    } else {
      this.projectId = this.config.data.project.id;
      this.title = this.config.data.project.title;
    }
  }

  onSubmit() {
    if (this.config.data.action === 'add') {
      this.projectService.createProject(this.title, this.userId);
    } else {
      this.projectService.changeProjectTitle(this.projectId, this.title);
    }

    this.ref.close();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
