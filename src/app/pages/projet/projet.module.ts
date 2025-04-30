import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetRoutingModule } from './projet-routing.module';
import { ListprojetsComponent } from './listprojets/listprojets.component';
import { AddprojetComponent } from './addprojet/addprojet.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListprojetsComponent,
    AddprojetComponent
  ],
  imports: [
    CommonModule,
    ProjetRoutingModule,
    FormsModule
  ]
})
export class ProjetModule { }
