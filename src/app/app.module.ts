import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LucideAngularModule, LayoutDashboard, Server, Briefcase, FileText } from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EquipementModule } from './pages/equipement/equipement.module';
import { ProjetModule } from './pages/projet/projet.module';

import { UserModule } from './pages/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorsService } from './services/token-interceptor.service';
import { NotificationModule } from './pages/notification/notification.module';
import { ExcelModule } from './pages/excel/excel.module';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainlayoutComponent,
    DashboardComponent,
    UpdateuserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LucideAngularModule.pick({ LayoutDashboard, Server, Briefcase, FileText }),
    EquipementModule,
    ProjetModule,
    FormsModule,
    UserModule,
    NotificationModule,
    ExcelModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorsService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
