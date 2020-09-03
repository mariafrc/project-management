import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {SelectItem} from 'primeng/api';

import { Store } from '@ngrx/store';
import {State} from '~store/index';
import {TaskStatus} from '~store/task/task.model';
import * as TaskActions from '~store/task/task.actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    action: 'add' | 'edit';
    taskForm: {title: string, status?: TaskStatus};
    status: SelectItem[] = [
      {label:'En attente', value: 'waiting'},
      {label:'En cours', value: 'processing'},
      {label:'Terminée', value: 'finished'}
    ]

   constructor(
  	public ref: DynamicDialogRef, 
  	public config: DynamicDialogConfig,
  	private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.action = this.config.data.action;
    if(this.action === 'add'){
      this.taskForm = {
        title: ""
      }
    } else {
      this.taskForm = {
        title: this.config.data.task.title,
        status: this.config.data.task.status
      }
    }
  }

  onSubmit(){
    if(this.action === 'add'){
      this.store.dispatch(TaskActions.TASK_MODAL_ADD_TASK({
        title: this.taskForm.title,
        projectId: this.config.data.projectId
      }))
    } else {
     this.store.dispatch(TaskActions.TASK_MODAL_UPDATE_TASK({
        task: {
          ...this.config.data.task,
          ...this.taskForm
        }
      }))
    }

    this.ref.close();
  }

}
