import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';

import { ListNotificationsComponent } from './list-notifications/list-notifications.component';


@NgModule({
  declarations: [
    ListNotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    
  ]
})
export class NotificationModule { }
