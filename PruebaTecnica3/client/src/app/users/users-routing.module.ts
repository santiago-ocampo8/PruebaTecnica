import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersModule } from './users.module';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
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
