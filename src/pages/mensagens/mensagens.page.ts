import { Component, OnInit } from '@angular/core';
import { Usuario, Notificacao } from '../../_lib/models';
import { NotificacoesService } from '../../core/notificacoes/notificacoes.service';
import { Autenticacao } from '@quali-check/domains';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensagens',
  templateUrl: 'mensagens.page.html',
  styleUrls: ['mensagens.page.scss'],
})
export class MensagensPage implements OnInit {

  auth: Autenticacao;
  usuario: Usuario;
  notificacoes: Notificacao[];

  constructor(
    private notificacoesService: NotificacoesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.auth = this.activatedRoute.snapshot.data['auth'];
    this.usuario = this.activatedRoute.snapshot.data['usuario'];
    this.listarMensagensNotificacoesUsuarios();
  }

  listarMensagensNotificacoesUsuarios() {
    this.notificacoesService.listarMensagensNotificacoesUsuarios(
      this.auth.id, this.usuario._id).subscribe(
        notificacoes => this.notificacoes = notificacoes
      )
  }

  // async abrirNotificacao(notificacao: Notificacao) {
  //   this.notificacao = notificacao;

  //   const modal = await this.modalController.create({
  //     component: NotificationModalPage,
  //     componentProps: { notificacao: this.notificacao }
  //   });

  //   modal.onDidDismiss().then((notificacao) => {
  //     if (notificacao !== null) {
  //       this.listarMinhasNotificacoes(this.filtros);
  //     }
  //   });

  //   return await modal.present();
  // }
}