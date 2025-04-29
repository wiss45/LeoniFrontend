import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  
  {path:"users",component:MainlayoutComponent,
    children: [
      
      { path: "", component: DashboardComponent },
      {path:'equipements',loadChildren : ()=>import('./pages/equipement/equipement.module').then(m =>m.EquipementModule) },
    ]
    
  }

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
