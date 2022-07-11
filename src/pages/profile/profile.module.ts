import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { UsuarioLogadoResolve } from '../../core/usuarios/usuario-logado.resolve';
import { BaseModule } from 'pages/base/base.module';


@NgModule({
  declarations: [ProfilePage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    BaseModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfilePage, 
        resolve: {
          usuario: UsuarioLogadoResolve

        }
      }
    ]),
  ]
})
export class ProfilePageModule { }
