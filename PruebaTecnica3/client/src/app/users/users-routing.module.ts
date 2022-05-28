import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';
import { LoginComponent } from './login/login.component';
import { UsersModule } from './users.module';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent,
    canActivate:[
      LoginGuard
    ]
  }
];

@NgModule({
  imports: [
  RouterModule.forChild(routes),
  UsersModule

],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
