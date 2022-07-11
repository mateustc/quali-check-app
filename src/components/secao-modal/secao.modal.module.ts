import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SecaoModalComponent } from './secao.modal.component';
import { PerguntaModalPageModule } from 'components/pergunta-modal/pergunta.modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PerguntaModalPageModule
  ],
  declarations: [SecaoModalComponent],
  entryComponents: [SecaoModalComponent]
})
export class SecaoModalPageModule {}