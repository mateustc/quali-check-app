import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Autenticacao } from '@quali-check/domains';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';
import { CFG } from 'config/cfg';

@Injectable({
    providedIn: 'root'
})
export class AuthChecked implements Resolve<Autenticacao>{

    constructor(
        private authService: AuthService,
        public navCtrl: NavController,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const auth =  this.authService.getAuth();
        if(auth && auth.id){
            this.navCtrl.navigateRoot(CFG.url_init);
        }
        return auth;
    }
}