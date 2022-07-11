import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { UsuarioPage } from './usuario.page';
import { UsuarioResolve } from 'core/usuarios/usuario.resolve';
import { BaseModule } from 'pages/base/base.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BaseModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsuarioPage
      },
      {
        path: ':id',
        component: UsuarioPage,
        resolve: {
          usuario: UsuarioResolve
        }
      }
    ]),
  ],
  declarations: [UsuarioPage]
})
export class UsuarioPageModule { }
