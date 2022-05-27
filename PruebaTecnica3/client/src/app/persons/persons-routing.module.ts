import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { PersonsModule } from './persons.module';

const routes: Routes = [
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "edit/:id",
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    PersonsModule
  ],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }