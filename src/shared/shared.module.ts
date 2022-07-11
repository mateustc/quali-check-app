import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { YesOrNoPipe } from './pipes/yes-or-no-pipe';
import { AgePipe } from './pipes/age-pipe';
import { NotificationStatusPipe } from './pipes/notifcation-status-pipe';
import { NotificationHourPipe } from './pipes/notification-hour-pipe';
import { RelativeTime } from './pipes/relative-time';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    YesOrNoPipe,
    NotificationStatusPipe,
    NotificationHourPipe,
    AgePipe,
    RelativeTime
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    AgePipe,
    YesOrNoPipe,
    NotificationStatusPipe,
    NotificationHourPipe,
    RelativeTime
  ],
})

export class SharedModule { }
