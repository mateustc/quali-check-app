import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { ConexoesPage } from './conexoes.page';
import { AuthResolve } from 'core/auth/auth.resolve';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConexoesPage,
        resolve: {
          auth: AuthResolve
        }
      }
    ]),
    ComponentsModule
  ],
  declarations: [ConexoesPage]
})
export class ConexoesPageModule {}
