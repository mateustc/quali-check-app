import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'core/auth/auth.service';
import { ValidatorsRules } from 'shared/form/validators';
import { CFG } from 'config/cfg';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      'email': [null, ValidatorsRules.EMAIL],
      'senha': [null, ValidatorsRules.SENHA]
    });
  }

  async abrirFormRecuperarSenha() {
    this.navCtrl.navigateRoot('/recuperar-senha');
  }

  abrirFormRegistro() {
    this.navCtrl.navigateRoot('/register');
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('email').value;
      const password = this.loginForm.get('senha').value;

      this.authService.login(username, password).subscribe(
        autenticacao => {
          this.navCtrl.navigateRoot(CFG.url_init);
        }
      )
    }
  }
}
