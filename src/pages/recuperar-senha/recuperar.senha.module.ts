import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RecuperarSenhaPage } from './recuperar.senha.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarSenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecuperarSenhaPage]
})
export class RecuperarSenhaPageModule {}
