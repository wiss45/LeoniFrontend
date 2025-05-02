import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  
  {path:"users",component:MainlayoutComponent,
    children: [
      
      { path: "", component: DashboardComponent,canActivate:[AuthGuardService] },
      {path:'equipements',loadChildren : ()=>import('./pages/equipement/equipement.module').then(m =>m.EquipementModule),canActivate:[AuthGuardService] },
      {path:'projets',loadChildren : ()=>import('./pages/projet/projet.module').then(m =>m.ProjetModule),canActivate:[AuthGuardService] },
      {path:'plans',loadChildren : ()=>import('./pages/plan/plan.module').then(m =>m.PlanModule),canActivate:[AuthGuardService] }
    ]
    
  },
  {path:"" , loadChildren : () => import('./pages/user/user.module').then(m=>m.UserModule)}

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
