import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

import { NotificacoesPage } from './notificacoes.page';
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
        component: NotificacoesPage,
        resolve: {
          auth: AuthResolve
        }
      }
    ]),
    ComponentsModule
  ],
  declarations: [NotificacoesPage]
})
export class NotificacoesPageModule { }
