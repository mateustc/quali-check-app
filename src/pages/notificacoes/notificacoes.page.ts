import { Component, OnInit } from '@angular/core';
import { Usuario, Notificacao } from '../../_lib/models';
import { UsuariosService } from '../../core/usuarios/usuarios.service';
import { NotificacoesService } from '../../core/notificacoes/notificacoes.service';
import { Autenticacao } from '@quali-check/domains';
import { FiltrosNotificacao } from './form/filtros-notificacao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notificacoes',
  templateUrl: 'notificacoes.page.html',
  styleUrls: ['notificacoes.page.scss'],
})
export class NotificacoesPage implements OnInit {

  auth: Autenticacao;
  usuarioLogado: Usuario;
  notificantes: Notificacao[];
  totalRegistros = 0;
  filtros = new FiltrosNotificacao();

  constructor(
    private usuariosService: UsuariosService,
    private notificacoesService: NotificacoesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.auth = this.activatedRoute.snapshot.data['auth'];
    this.listarMeusNotificantes();
  }

  listarMeusNotificantes() {
    this.usuariosService.listarMeusNotificantes(this.auth.id).subscribe(
      data => {
        this.totalRegistros = data.length;
        this.notificantes = data;
      }
    );
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

  isMinhaNotificacao(notificacao: Notificacao): boolean {
    return this.notificacoesService.isMinhaNotificacao(notificacao, this.auth.id);
  }
}