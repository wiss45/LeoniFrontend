import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelRoutingModule } from './excel-routing.module';

import { ImportexcelComponent } from './importexcel/importexcel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [
    ImportexcelComponent
  ],
  imports: [
    CommonModule,
    ExcelRoutingModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatListModule,  // Ajouté ici
    MatDividerModule,  // Ajouté ici
    FormsModule,
   
  ]
})
export class ExcelModule { }
