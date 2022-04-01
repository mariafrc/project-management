import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
// import {RegisterComponent} from './components/register/register.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
	{path: "login", component: LoginComponent},
	{path: "app", loadChildren: () => import("./modules/user/user.module").then((u) => {u.UserModule})}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
