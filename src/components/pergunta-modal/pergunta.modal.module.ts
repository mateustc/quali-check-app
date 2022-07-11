import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerguntaModalComponent } from './pergunta.modal.component';
import { ComentarioModalPageModule } from 'components/comentario-modal/comentario.modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComentarioModalPageModule
  ],
  declarations: [PerguntaModalComponent],
  entryComponents: [PerguntaModalComponent]
})
export class PerguntaModalPageModule {}