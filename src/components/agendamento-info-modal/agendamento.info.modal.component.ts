import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-agendamento-info-modal',
  templateUrl: './agendamento.info.modal.component.html',
})
export class AgendamentoInfoModalComponent implements OnInit {

  agendamento: any;

  constructor(private modalController: ModalController,
              params: NavParams) {
    this.agendamento = params.get('agendamento');
  }

  ngOnInit() {

  }

  close(){
    this.modalController.dismiss();
  }
}
