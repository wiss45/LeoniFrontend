import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { LucideAngularModule, LayoutDashboard, Server, Briefcase, FileText } from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EquipementModule } from './pages/equipement/equipement.module';

@NgModule({
  declarations: [
    AppComponent,
    MainlayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({ LayoutDashboard, Server, Briefcase, FileText }),
    EquipementModule,
  
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
