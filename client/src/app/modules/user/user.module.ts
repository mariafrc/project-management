import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {PrimengModule} from '~modules/primeng/primeng.module';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from '../../store/project/project.effects';
import { StoreModule } from '@ngrx/store';
import * as fromProject from '~store/project/project.reducer';
import { ProjectComponent } from './project/project.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
	{
		path: '',
		component: UserComponent,
		children: [
      {path: '', redirectTo: 'project', pathMatch: 'full'},
      {path: 'project', component: ProjectComponent},
      {path: '**', redirectTo: 'project', pathMatch: 'full'}
    ]
	}
];

@NgModule({
  declarations: [UserComponent, ProjectComponent, ProjectFormComponent],
  entryComponents: [ProjectFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    FormsModule,
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects])
  ]
})
export class UserModule { }
