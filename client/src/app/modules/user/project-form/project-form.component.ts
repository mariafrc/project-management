import { Component, OnInit, Input, EventEmitter  } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { Store } from '@ngrx/store';
import {State} from '~store/index';
import * as ProjectActions from '~store/project/project.actions';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
	id: number;
	title: string;
  constructor(
  	public ref: DynamicDialogRef, 
  	public config: DynamicDialogConfig,
  	private store: Store<State>
  ) { }

  ngOnInit(): void {
  	if(this.config.data.action === "add"){
  		this.title = "";
  	} else {
  		this.id = this.config.data.project.id;
  		this.title = this.config.data.project.title;
  	}
  }

  onSubmit(){
  	if(this.config.data.action === "add"){
  		this.store.dispatch(ProjectActions.PROJECT_MODAL_ADD_PROJECT({title: this.title}))
  	} else {
  		this.store.dispatch(ProjectActions.PROJECT_MODAL_UPDATE_PROJECT({
  			id: this.id,
  			title: this.title
  		}))
  	}

  	this.ref.close();
  }
}
