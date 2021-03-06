import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

import { HomePage } from './home.page';
import { NotificationModalPageModule } from 'components/notification-modal/notification-modal.module';
import { AuthResolve } from 'core/auth/auth.resolve';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationModalPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        resolve: {
          auth: AuthResolve
        }
      }
    ]),
    ComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
