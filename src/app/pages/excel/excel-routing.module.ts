import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportexcelComponent } from './importexcel/importexcel.component';

const routes: Routes = [
  {path:'', component:ImportexcelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelRoutingModule { }
