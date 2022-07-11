import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Usuario, Notificacao } from '../../_lib/models';
import { UsuariosService } from '../../core/usuarios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { NotificacoesService } from '../../core/notificacoes/notificacoes.service';
import { Autenticacao } from '@quali-check/domains';
import { NotificationModalPage } from '../../components/notification-modal/notification-modal.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conexoes',
  templateUrl: 'conexoes.page.html',
  styleUrls: ['conexoes.page.scss'],
})
export class ConexoesPage implements OnInit {

  auth: Autenticacao;
  conexoes: Usuario[];
  
  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.auth = this.activatedRoute.snapshot.data['auth'];
    this.listarMinhasConexoes();
  }

  ngOnInit() {
  }

  listarMinhasConexoes() {
    this.usuariosService.listarMinhasConexoes(this.auth.id).subscribe(
      data => {
        this.conexoes = data;
      }
    );
  }

}