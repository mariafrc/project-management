import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectService } from 'src/app/akita-store/project/project.service';
import { ProjectsQuery } from 'src/app/akita-store/project/project.query';
import { Project } from 'src/app/akita-store/project/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [DialogService, ConfirmationService],
})
export class ProjectComponent implements OnInit {
  projects$: Observable<Project[]>;
  constructor(
    private confirmation: ConfirmationService,
    public dialogService: DialogService,
    private projectService: ProjectService,
    private projectQuery: ProjectsQuery,
    private router: Router
  ) {
    this.projects$ = this.projectQuery.projects$;
  }

  ngOnInit(): void {}

  onAdd() {
    this.dialogService.open(ProjectFormComponent, {
      header: 'Nouveau projet',
      width: '70%',
      data: {
        action: 'add',
      },
    });
  }

  onEdit(project: Project) {
    this.dialogService.open(ProjectFormComponent, {
      header: 'Modification',
      width: '70%',
      data: {
        action: 'edit',
        project,
      },
    });
  }

  onDelete(id: number) {
    this.confirmation.confirm({
      message: 'Voulez-vous vraiment executer cet action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.projectService.removeProject(id);
      },
    });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
