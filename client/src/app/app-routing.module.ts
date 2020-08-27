import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './providers/guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RedirectComponent} from './components/redirect/redirect.component';

const routes: Routes = [
	{path: '', redirectTo: '/redirect', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'redirect', component: RedirectComponent, canActivate: [AuthGuard]},
	{path: 'user', loadChildren: './modules/user/user.module#UserModule'},
	{path: '**', redirectTo: '/redirect', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
