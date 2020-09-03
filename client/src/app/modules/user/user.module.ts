import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {PrimengModule} from '~modules/primeng/primeng.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButtonModule} from 'primeng/selectbutton';

import { ProjectEffects } from '../../store/project/project.effects';
import { TaskEffects } from '../../store/task/task.effects';
import * as fromProject from '~store/project/project.reducer';
import * as fromTask from '~store/task/task.reducer';

import { ProjectComponent } from './project/project.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TaskPreviewComponent } from './task-preview/task-preview.component';
import { TaskFormComponent } from './task-form/task-form.component';
import {TaskStatusPipe} from './pipes/task-status.pipe';

const routes: Routes = [
	{
		path: '',
		component: UserComponent,
		children: [
      {path: '', redirectTo: 'projects', pathMatch: 'full'},
      {path: 'projects', component: ProjectComponent},
      {path: 'projects/:id/tasks', component: TaskPreviewComponent},
      {path: '**', redirectTo: 'projects', pathMatch: 'full'}
    ]
	}
];

@NgModule({
  declarations: [
    UserComponent, 
    ProjectComponent, 
    ProjectFormComponent, 
    TaskPreviewComponent, 
    TaskFormComponent,
    TaskStatusPipe
  ],
  entryComponents: [ProjectFormComponent, TaskFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    FormsModule,
    AccordionModule,
    DropdownModule,
    SelectButtonModule,
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducer),
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.reducer),
    EffectsModule.forFeature([ProjectEffects, TaskEffects])
  ]
})
export class UserModule { }
