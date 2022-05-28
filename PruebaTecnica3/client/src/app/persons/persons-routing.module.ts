import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlInjectionGuard } from '../guards/url-injection.guard';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { PersonsModule } from './persons.module';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
    canActivate:[
      UrlInjectionGuard
    ]
  },
  {
    path: "create",
    component: CreateComponent,
    canActivate:[
      UrlInjectionGuard
    ]
  },
  {
    path: "edit/:id",
    component: EditComponent,
    canActivate:[
      UrlInjectionGuard
    ]
  },
  {
    path: "view",
    component: ViewComponent,
    canActivate:[
      UrlInjectionGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    PersonsModule
  ],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
