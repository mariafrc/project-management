import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {DialogService} from 'primeng/dynamicdialog';
import {ProjectFormComponent} from '../project-form/project-form.component';

import {State} from '~store/index';
import {Project} from '~store/project/project.model';
import { selectProjects } from '~store/project/project.selectors';
import * as ProjectActions from '~store/project/project.actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [DialogService]
})
export class ProjectComponent implements OnInit {
  projects$: Observable<Project[]>
  constructor(
    public dialogService: DialogService,
    private store: Store<State>  
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
    this.store.dispatch(ProjectActions.PROJECT_PAGE_DELETE_PROJECT({id}))
  }

}
