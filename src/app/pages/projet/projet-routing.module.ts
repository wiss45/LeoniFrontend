import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListprojetsComponent } from './listprojets/listprojets.component';

const routes: Routes = [
  {path:"" , component:ListprojetsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
