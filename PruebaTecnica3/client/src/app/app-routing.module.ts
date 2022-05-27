import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsRoutingModule } from './persons/persons-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    UsersRoutingModule,
    PersonsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
