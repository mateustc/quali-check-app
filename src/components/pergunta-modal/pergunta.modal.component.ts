import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ComentarioModalComponent } from 'components/comentario-modal/comentario.modal.component';
import { AgendamentosService } from 'core/agendamentos/agendamentos.service';
import { NotificationService } from 'shared/notifications/notification.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pergunta-modal',
  templateUrl: './pergunta.modal.component.html',
})
export class PerguntaModalComponent implements OnInit {

  agendamento: any;
  nivel: any;
  secao: any;
  secoes: any[];

  constructor(private modalController: ModalController,
              private notificationService: NotificationService,
              private agendamentosService: AgendamentosService,
              public params: NavParams) {
    this.agendamento = params.get('agendamento');
    this.nivel = params.get('nivel');
    this.secao = params.get('secao');
    this.secoes = params.get('secoes');
  }

  ngOnInit() {
    setTimeout(() => {
      this.config();
    }, 0);
  }

  config() {
    if (this.agendamento.secoesRespostas && this.agendamento.secoesRespostas.length > 0
      && this.secoes && this.secoes.length > 0) {
      for (let i = 0; i < this.secoes.length; i++) {
        let secao: any = this.secoes[i];
        const secaoResposta = this.agendamento.secoesRespostas.find((x:any) => x._id === secao._id);

        if (secaoResposta) {
          secao.naoSeAplica = secaoResposta.naoSeAplica;
          secao.bancoItens = secaoResposta.bancoItens;
        }
      }
    }
    this.secao = this.secoes.find((x:any) => x._id === this.secao._id);
  }

  getOpcao(bancoItem: any, opcao: any) {
    for (let i = 0; i < bancoItem.opcao.length; i++) {
      const element = bancoItem.opcao[i];
      element.checked = false;

      if (element.item === opcao) {
        element.checked = true;
      }
    }
  }

  isPrimeiraSecao() {
    const index = _.findIndex(this.secoes, (x:any) => x._id === this.secao._id);
    return index === 0 ? true : false;
  }

  isUltimaSecao() {
    const index = _.findIndex(this.secoes, (x:any) => x._id === this.secao._id);
    return index === this.secoes.length - 1 ? true : false;
  }

  pausar() {
    this.atualizarAgendamento("PAUSADA");
  }

  finalizar() {
    this.atualizarAgendamento("FINALIZADA");
  }

  async processarSecao(acao: string) {
    if (acao === 'secaoAnterior' && this.isPrimeiraSecao()) {
      this.notificationService.warning("Encontra-se na primeira seção");
      return;
    }

    if (acao === 'proximaSecao' &&  this.isUltimaSecao()) {
      this.notificationService.warning("Encontra-se na última seção");
      return;
    }

    this.agendamento.secoesRespostas = this.secoes;
    this.agendamento.status = 'EM ANDAMENTO';
    this.agendamentosService.atualizarAgendamento(this.agendamento._id, this.agendamento).subscribe(
      data => {
        
      });

    let index = _.findIndex(this.secoes, (x:any) => x._id === this.secao._id);
    index = acao === 'secaoAnterior' ? --index : ++index;

    this.secao = this.secoes[index];
  }

  salvar() {
    this.agendamento.secoesRespostas = this.secoes;
    this.agendamento.status = 'EM ANDAMENTO';
    this.agendamentosService.atualizarAgendamento(this.agendamento._id, this.agendamento).subscribe(
      data => {
        this.notificationService.info(`Visita salva com sucesso!`);  
      });
  }

  async atualizarAgendamento(status: string) {
    this.agendamento.secoesRespostas = this.secoes;
    this.agendamento.status = status;
    this.agendamentosService.atualizarAgendamento(this.agendamento._id, this.agendamento).subscribe(
      data => {
        this.notificationService.info(`Visita ${status.toLowerCase()} com sucesso!`);  
      });
  }

  async abrirComentario(bancoItem: any) {
    const modal = await this.modalController.create({
      component: ComentarioModalComponent,
      componentProps: {
        agendamento: this.agendamento,
        nivel: this.nivel,
        secao: this.secao,
        bancoItem
      }
    });

    modal.onDidDismiss().then((resp: any) => {
      bancoItem.resposta = resp.data.comentario;
    });

    return await modal.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
