import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {AuthGuard} from '../../providers/guards/auth.guard';
import {UserGuard} from '../../providers/guards/user.guard';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{
		path: '',
		canActivate: [AuthGuard, UserGuard],
		component: UserComponent,
		children: [
			{path: '', redirectTo: 'home', pathMatch: 'full'},
			{path: 'home', component: HomeComponent},
			{path: '**', redirectTo: 'home', pathMatch: 'full'},
		]
	}
];

@NgModule({
  declarations: [
  	UserComponent,
  	HomeComponent,
  ],
  imports: [
  	FormsModule,
    CommonModule,
		MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
