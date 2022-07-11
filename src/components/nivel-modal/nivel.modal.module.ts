import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NivelModalComponent } from './nivel.modal.component';
import { SecaoModalPageModule } from 'components/secao-modal/secao.modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SecaoModalPageModule
  ],
  declarations: [NivelModalComponent],
  entryComponents: [NivelModalComponent]
})
export class NivelModalPageModule {}