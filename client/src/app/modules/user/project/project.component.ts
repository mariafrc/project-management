import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';

import {State} from '~store/index';
import {Project} from '~store/project/project.model';
import { selectProjects } from '~store/project/project.selectors';
import * as ProjectActions from '~store/project/project.actions';

import {ProjectFormComponent} from '../project-form/project-form.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class ProjectComponent implements OnInit {
  projects$: Observable<Project[]>
  constructor(
    public dialogService: DialogService,
    private store: Store<State>,
    private confirmation: ConfirmationService
  ) {
    this.projects$ = store.pipe(select(selectProjects));
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectActions.PROJECT_PAGE_LOAD_PROJECTS());
  }

  onAdd(){
  	const ref = this.dialogService.open(ProjectFormComponent, {
        header: 'Nouveau projet',
        width: '70%',
        data: {
          action: 'add'
        }
    });
  }

  onEdit(project: Project){
    const ref = this.dialogService.open(ProjectFormComponent, {
        header: 'Modification',
        width: '70%',
        data: {
          action: 'edit',
          project
        }
    });
  }

  onDelete(id: number){
    this.confirmation.confirm({
      message: 'Voulez-vous vraiment executer cet action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.store.dispatch(ProjectActions.PROJECT_PAGE_DELETE_PROJECT({id}))
      }
    })
  }

}
