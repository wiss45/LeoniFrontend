import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';

import { ListNotificationsComponent } from './list-notifications/list-notifications.component';
import { NotificationsequipementsComponent } from './notificationsequipements/notificationsequipements.component';


@NgModule({
  declarations: [
    ListNotificationsComponent,
    NotificationsequipementsComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    
  ]
})
export class NotificationModule { }
