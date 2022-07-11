import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Usuario } from '@quali-check/models';
import { UsuariosService } from './usuarios.service';
import { AuthService } from '../../core/auth/auth.service';
import { NavController } from '@ionic/angular';
import { CFG } from '../../config/cfg';

@Injectable({
    providedIn: 'root'
})
export class UsuarioLogadoResolve implements Resolve<Usuario>{

    constructor(
        private usuariosService: UsuariosService,
        private authService: AuthService,
        public navCtrl: NavController,

    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const auth = this.authService.getAuth()
        if(auth){
            return this.usuariosService.obterPorId(auth.id);
        }else{
            this.navCtrl.navigateRoot(CFG.url_init);
        }
        
    }
}