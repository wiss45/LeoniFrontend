import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListplansComponent } from './listplans/listplans.component';

const routes: Routes = [
  {path:'' , component:ListplansComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
