import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListprojetsComponent } from './listprojets/listprojets.component';
import { ModplanComponent } from './modplan/modplan.component';

const routes: Routes = [
  {path:"" , component:ListprojetsComponent},
  {path:'modplan/:id',component:ModplanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
