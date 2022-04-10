import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { providers } from './providers';

//modules
import { PrimengModule } from '~modules/primeng/primeng.module';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProjectComponent } from './pages/app-content/project/project.component';
import { ProjectFormComponent } from './pages/app-content/project-form/project-form.component';
import { TaskFormComponent } from './pages/app-content/task-form/task-form.component';
import { TaskPreviewComponent } from './pages/app-content/task-preview/task-preview.component';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { AppContentWrapperComponent } from './pages/app-content/app-content-wrapper/app-content-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProjectComponent,
    ProjectFormComponent,
    TaskFormComponent,
    TaskPreviewComponent,
    AppContentWrapperComponent,
    TaskStatusPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PrimengModule,
    CommonModule,
  ],
  providers: [...providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
