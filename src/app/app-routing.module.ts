import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  
  {path:"users",component:MainlayoutComponent,canActivate:[AuthGuardService],
    children: [
      
      {path: "", component: DashboardComponent,canActivate:[AuthGuardService] },
      {path:'equipements',loadChildren : ()=>import('./pages/equipement/equipement.module').then(m =>m.EquipementModule),canActivate:[AuthGuardService] },
      {path:'projets',loadChildren : ()=>import('./pages/projet/projet.module').then(m =>m.ProjetModule),canActivate:[AuthGuardService] },
     
      {path:"notifications" , loadChildren : () => import('./pages/notification/notification.module').then(m=>m.NotificationModule),canActivate:[AuthGuardService]},
      {path:"importExcel" , loadChildren : () => import('./pages/excel/excel.module').then(m=>m.ExcelModule),canActivate:[AuthGuardService]},
    ]
    
  },
  {path:"" , loadChildren : () => import('./pages/user/user.module').then(m=>m.UserModule)},
  

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
