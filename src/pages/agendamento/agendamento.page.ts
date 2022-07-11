import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Autenticacao } from '@quali-check/domains';
import { AgendamentosService } from 'core/agendamentos/agendamentos.service';
import { AgendamentoInfoModalComponent } from 'components/agendamento-info-modal/agendamento.info.modal.component';
import { NivelModalComponent } from 'components/nivel-modal/nivel.modal.component';
import { DadosInstituicaoModalComponent } from 'components/dados-instituicao-modal/dados.instituicao.modal.component';

@Component({
  selector: 'app-agendamento',
  templateUrl: 'agendamento.page.html',
  styleUrls: ['agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {

  agendamentos: any;
  auth: Autenticacao;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agendamentosService: AgendamentosService,
    protected modalController: ModalController
  ) { }

  ngOnInit() {
    this.auth = this.activatedRoute.snapshot.data['auth'];
    this.carregarAgendamentos();
  }

  async carregarAgendamentos() {
    const filtro = {
      value: {
        auditorLider: this.auth
      }
    }

    this.agendamentosService.listarTodosAgendamentos(filtro).subscribe(
      data => {
        this.agendamentos = data;
      }
    )
  }

  async abrirInformacoes(agendamento: any) {
    const modal = await this.modalController.create({
      component: AgendamentoInfoModalComponent,
      componentProps: {
        agendamento
      }
    });
    return await modal.present();
  }

  async abrirDadosInstituicao(agendamento: any) {
    const modal = await this.modalController.create({
      component: DadosInstituicaoModalComponent,
      componentProps: {
        agendamento
      }
    });
    return await modal.present();
  }

  existeAgendamento() {
    return this.agendamentos && this.agendamentos.length > 0;
  }
  
  setarCorStatus(agendamento: any) {
    let cor = 'orange';

    if (agendamento.status === 'EM VISITA') {
      cor = 'green';
    }

    if (agendamento.status === 'PAUSADA') {
      cor = 'red';
    }

    if (agendamento.status === 'FINALIZADA') {
      cor = 'black';
    }

    return cor;
  }
}