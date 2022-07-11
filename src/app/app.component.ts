import { Component, OnInit } from '@angular/core';
import { AuthService } from 'core/auth/auth.service';
import { NavController } from '@ionic/angular';
import { CFG } from 'config/cfg';

@Component({
  selector: 'app-root',
  template: `<ng-http-loader></ng-http-loader>  
  <ion-router-outlet main></ion-router-outlet>`
})
export class AppComponent {

  constructor(
    public navCtrl: NavController,
    private authService: AuthService) {
      this.restoreSession();
  }

  restoreSession() {

    this.authService.restoreSession().then(autenticacao => {
      this.navCtrl.navigateRoot(CFG.url_init);
    });
  }

}
