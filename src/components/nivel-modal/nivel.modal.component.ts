import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SecaoModalComponent } from 'components/secao-modal/secao.modal.component';

@Component({
  selector: 'app-nivel-modal',
  templateUrl: './nivel.modal.component.html',
})
export class NivelModalComponent implements OnInit {

  agendamento: any;
  niveis: any[];

  constructor(private modalController: ModalController,
              params: NavParams) {
    this.agendamento = params.get('agendamento');
  }

  ngOnInit() {
    this.carregarNiveis();
  }

  async carregarNiveis() {
    this.niveis = [
      {
        descricao: "NÍVEL 1 - BRONZE"
      },
      {
        descricao: "NÍVEL 2 - PRATA"
      },
      {
        descricao: "NÍVEL 3 - OURO"
      }]
  }

  async abrirSecoes(nivel: any) {
    const modal = await this.modalController.create({
      component: SecaoModalComponent,
      componentProps: {
        agendamento: this.agendamento,
        nivel
      }
    });
    return await modal.present();
  }

  close(){
    this.modalController.dismiss();
  }
}
