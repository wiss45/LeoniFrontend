import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetRoutingModule } from './projet-routing.module';
import { ListprojetsComponent } from './listprojets/listprojets.component';
import { AddprojetComponent } from './addprojet/addprojet.component';
import { FormsModule } from '@angular/forms';
import { ModprojetComponent } from './modprojet/modprojet.component';
import { ModplanComponent } from './modplan/modplan.component';
import { AddplanComponent } from './addplan/addplan.component';


@NgModule({
  declarations: [
    ListprojetsComponent,
    AddprojetComponent,
    ModprojetComponent,
    ModplanComponent,
    AddplanComponent
  ],
  imports: [
    CommonModule,
    ProjetRoutingModule,
    FormsModule
  ]
})
export class ProjetModule { }
