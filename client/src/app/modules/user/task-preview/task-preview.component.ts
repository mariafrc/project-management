import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DialogService} from 'primeng/dynamicdialog';
import {ActivatedRoute} from '@angular/router';
import {SelectItem} from 'primeng/api';

import {TaskFormComponent} from '../task-form/task-form.component';

import { Store, select } from '@ngrx/store';
import {State} from '~store/index';
import {Project} from '~store/project/project.model';
import {Task} from '~store/task/task.model';
import { selectTasks } from '~store/task/task.selectors';
import { selectProject } from '~store/project/project.selectors';
import * as ProjectActions from '~store/project/project.actions';
import * as TaskActions from '~store/task/task.actions';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss'],
  providers: [DialogService]
})
export class TaskPreviewComponent implements OnInit, OnDestroy {
  filter = {title: "", status: ""}
	project: Project;
	_tasks: Task[];
	projectId: number;
  projectSubscription: Subscription;
  taskSubscription: Subscription;
  status: SelectItem[];

  constructor(
  	public dialogService: DialogService,
    private store$: Store<State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectSubscription = this.store$
      .pipe(select(selectProject))
      .subscribe((project)=>{
        this.project = project;
      })

    this.taskSubscription = this.store$
      .pipe(select(selectTasks))
      .subscribe((tasks)=>{
        this._tasks = tasks
      })

  	this.projectId = Number(this.route.snapshot.params['id']);
  	this.store$.dispatch(ProjectActions.TASK_PAGE_SELECT_PROJECT({id: this.projectId}));
  	this.store$.dispatch(TaskActions.TASK_PAGE_LOAD_TASK({projectId: this.projectId}));

    this.status = [
      {label: "----------", value: null},
      {label:'En attente', value: 'waiting'},
      {label:'En cours', value: 'processing'},
      {label:'Terminée', value: 'finished'}
    ]
  }

  get tasks(): Task[]{
    let tasks = this._tasks;
    if(this.filter.title){
      tasks = tasks.filter(t => t.title.includes(this.filter.title) );
    }

    if(this.filter.status){
      tasks = tasks.filter(t => (t.status === this.filter.status) );
    }
    return tasks
  }


  onAdd(): void{
    this.dialogService.open(TaskFormComponent, {
        header: 'Nouvelle tâche',
        width: '70%',
        data: {
          action: 'add',
          projectId: this.projectId
        }
    });
  }

  onEdit(task: Task): void{
    this.dialogService.open(TaskFormComponent, {
        header: 'Modification',
        width: '70%',
        data: {
          action: 'edit',
          task
        }
    });
  }

  onDelete(id: number){
    this.store$.dispatch(TaskActions.TASK_PAGE_DELETE_TASK({id}));
  }

  onResetFilter(){
    this.filter = {title: "", status: ""};
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }
}
