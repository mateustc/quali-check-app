import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PerguntaModalComponent } from 'components/pergunta-modal/pergunta.modal.component';
import { SecoesService } from 'core/secoes/secoes.service';

@Component({
  selector: 'app-secao-modal',
  templateUrl: './secao.modal.component.html',
})
export class SecaoModalComponent implements OnInit {

  agendamento: any;
  nivel: any;
  secoes: any[];

  constructor(private modalController: ModalController,
              private secoesService: SecoesService,
              params: NavParams) {
    this.agendamento = params.get('agendamento');
    this.nivel = params.get('nivel');
  }

  ngOnInit() {
    this.carregarSecoesPorTipo();
  }

  async carregarSecoesPorTipo() {
    const filtro = {
      value: {
        tipoSecao: this.nivel.descricao
      }
    }

    this.secoesService.listarSecoesPorTipo(filtro).subscribe(
      data => {
        this.secoes = data;
      }
    )
  }

  async abrirPerguntas(secao: any) {
    const modal = await this.modalController.create({
      component: PerguntaModalComponent,
      componentProps: {
        agendamento: this.agendamento,
        nivel: this.nivel,
        secoes: this.secoes,
        secao
      }
    });
    return await modal.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
