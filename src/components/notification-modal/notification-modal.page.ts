import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Notificacao } from '../../_lib/models/notificacao';
import { NotificacoesService } from 'core/notificacoes/notificacoes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacaoDto } from '@quali-check/dtos';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.page.html',
  styleUrls:['./notification-modal.page.scss']
})
export class NotificationModalPage implements OnInit {

  notificacaoForm: FormGroup;
  notificacao: Notificacao;

  constructor(
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private modalController: ModalController,
    private notificacoesService: NotificacoesService
  ){}

  ngOnInit() {
    this.createFormGroupNotificacao();
  }

  ionViewWillEnter() {
    this.notificacao = this.navParams.get('notificacao');  
  }

  createFormGroupNotificacao() {
    this.notificacaoForm = this.formBuilder.group({
      assunto: [''],
      descricao: ['', Validators.required]
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  aceitar() {
    let notificacaoDto : NotificacaoDto = this.notificacaoForm.value;
    this.notificacoesService.aceitar(this.notificacao, notificacaoDto).subscribe(
      data => {
        this.modalController.dismiss(this.notificacao);
      }
    );
  }

  rejeitar() {
    let notificacaoDto : NotificacaoDto = this.notificacaoForm.value;
    this.notificacoesService.rejeitar(this.notificacao, notificacaoDto).subscribe(
      data => {
        this.modalController.dismiss(this.notificacao);
      }
    );
  }

  notificar() {
    let notificacaoDto : NotificacaoDto = this.notificacaoForm.value;
    this.notificacoesService.notificar(this.notificacao, notificacaoDto).subscribe(
      data => {
        this.modalController.dismiss(this.notificacao);
      }
    );
  }

  isSolicitacao(): boolean {
    return this.notificacoesService.isSolicitacaoConexao(this.notificacao);
  }

  isBloqueada(): boolean {
    return this.notificacoesService.isBloqueada(this.notificacao);
  }

  isSolicitacaoBloqueada(): boolean {
    return this.notificacoesService.isSolicitacaoBloqueada(this.notificacao);
  }
}