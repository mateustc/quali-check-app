import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgendamentoInfoModalComponent } from './agendamento.info.modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [AgendamentoInfoModalComponent],
  entryComponents: [AgendamentoInfoModalComponent]
})
export class AgendamentoInfoModalPageModule {}