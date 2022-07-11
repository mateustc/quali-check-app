import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { DashboardPage } from './dashboard.page';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { UsuarioResolve } from 'core/usuarios/usuario.resolve';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPage
      }
    ]),
    ComponentsModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
