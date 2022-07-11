import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'shared/notifications/notification.service';
import { UsuariosService } from 'core/usuarios/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { AbstractUsuarioPage } from 'pages/base/abstract-usuario.page';


@Component({
  selector: 'app-usuario',
  templateUrl: 'usuario.page.html',
  styleUrls: ['usuario.page.scss'],
})
export class UsuarioPage extends AbstractUsuarioPage {

  hiddenForms = [false, true, true];
  segmentIndex = 0;

  constructor(
    protected navCtrl: NavController,
    protected activatedRoute: ActivatedRoute,
    protected notificationService: NotificationService,
    protected formBuilder: FormBuilder,
    protected usuariosService: UsuariosService,
    protected modalController: ModalController) {
      super(navCtrl, activatedRoute, notificationService, formBuilder, usuariosService, modalController);
  }

  showForm(index) {
    this.hiddenForms = [true, true, true];
    this.hiddenForms[index] = false;
    this.segmentIndex = index;
  }

}