import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '~guards/auth.guard';
import { AppContentWrapperComponent } from './pages/app-content/app-content-wrapper/app-content-wrapper.component';
import { ProjectComponent } from './pages/app-content/project/project.component';
import { TaskPreviewComponent } from './pages/app-content/task-preview/task-preview.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: AppContentWrapperComponent,
    children: [
      { path: '', redirectTo: '/app/projects', pathMatch: 'full' },
      { path: 'projects', component: ProjectComponent },
      { path: 'projects/:id/tasks', component: TaskPreviewComponent },
      { path: '**', redirectTo: '/app/projects', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
