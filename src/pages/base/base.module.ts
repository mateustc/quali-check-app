import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AbstractUsuarioPage } from './abstract-usuario.page';

@NgModule({
  declarations: [AbstractUsuarioPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports:[
    AbstractUsuarioPage
  ]
})
export class BaseModule { }
