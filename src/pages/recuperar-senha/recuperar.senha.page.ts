import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from 'core/auth/auth.service';
import { NotificationService } from 'shared/notifications/notification.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar.senha.page.html',
  styleUrls: ['./recuperar.senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {
  public recuperarSenhaForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    protected notificationService: NotificationService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.recuperarSenhaForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.email
      ])]
    });
  }

  recuperarSenha() {
    if (this.recuperarSenhaForm.valid) {
      const username = this.recuperarSenhaForm.get('email').value;

      this.authService.recuperarSenha(username).subscribe(
        autenticacao => {
          this.notificationService.info(`Nova senha enviada para o e-mail ${this.recuperarSenhaForm.value.email}`)
        }
      )
    }
  }

  abrirFormLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
