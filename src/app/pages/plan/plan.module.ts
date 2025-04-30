import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { AddplanComponent } from './addplan/addplan.component';
import { ListplansComponent } from './listplans/listplans.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddplanComponent,
    ListplansComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    FormsModule
  
  ]
})
export class PlanModule { }
