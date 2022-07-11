import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/notifications/notification.service';
import { UsuariosService } from '../../core/usuarios/usuarios.service';
import { NavController, ModalController } from '@ionic/angular';
import { AbstractUsuarioPage } from 'pages/base/abstract-usuario.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends AbstractUsuarioPage {

  constructor(
    protected navCtrl: NavController,
    protected activatedRoute: ActivatedRoute,
    protected notificationService: NotificationService,
    protected formBuilder: FormBuilder,
    protected usuariosService: UsuariosService,
    protected modalController: ModalController) {
    super(navCtrl, activatedRoute, notificationService, formBuilder, usuariosService, modalController);
  }

  posSalvarUsuario() {
    this.notificationService.info('Perfil Atualizado com sucesso!!');
  }
}
