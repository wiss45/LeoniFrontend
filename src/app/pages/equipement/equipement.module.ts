import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipementRoutingModule } from './equipement-routing.module';
import { ListequipementsComponent } from './listequipements/listequipements.component';
import { AddequipementComponent } from './addequipement/addequipement.component';
import { ModequipementComponent } from './modequipement/modequipement.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListequipementsComponent,
    AddequipementComponent,
    ModequipementComponent
  ],
  imports: [
    CommonModule,
    EquipementRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class EquipementModule { }
