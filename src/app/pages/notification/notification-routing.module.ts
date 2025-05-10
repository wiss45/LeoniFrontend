import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';
import { NotificationsequipementsComponent } from './notificationsequipements/notificationsequipements.component';

const routes: Routes = [
  {path:"" , component:ListNotificationsComponent},
  {path:"equipementsNotifications" , component:NotificationsequipementsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
