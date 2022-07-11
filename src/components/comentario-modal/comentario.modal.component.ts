import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NotificationService } from 'shared/notifications/notification.service';

@Component({
  selector: 'app-comentario-modal',
  templateUrl: './comentario.modal.component.html',
})
export class ComentarioModalComponent implements OnInit {

  agendamento: any;
  nivel: any;
  secao: any;
  bancoItem: any;
  comentario: "";

  constructor(private modalController: ModalController,
              params: NavParams) {
    this.agendamento = params.get('agendamento');
    this.nivel = params.get('nivel');
    this.secao = params.get('secao');
    this.bancoItem = params.get('bancoItem');
  }

  ngOnInit() {
    this.comentario = this.bancoItem.resposta;
  }

  salvarComentario() {
    this.close();
  }

  close() {
    this.modalController.dismiss({
      comentario: this.comentario
    });
  }
}
