import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { NotificationModalPageModule } from 'components/notification-modal/notification-modal.module';
import { AuthResolve } from 'core/auth/auth.resolve';
import { MensagensPage } from './mensagens.page';
import { UsuarioResolve } from 'core/usuarios/usuario.resolve';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NotificationModalPageModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: MensagensPage, 
        resolve: {
          auth: AuthResolve,
          usuario: UsuarioResolve
        }
      }
    ]),
    ComponentsModule
  ],
  declarations: [MensagensPage]
})
export class MensagensPageModule { }
