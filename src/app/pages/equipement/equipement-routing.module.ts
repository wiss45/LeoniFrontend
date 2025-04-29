import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListequipementsComponent } from './listequipements/listequipements.component';

const routes: Routes = [
  {path :'',component:ListequipementsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipementRoutingModule { }
