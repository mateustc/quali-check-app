import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Usuario } from '@quali-check/models';
import { UsuariosService } from './usuarios.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioResolve implements Resolve<Usuario>{

    constructor(
        private usuariosService: UsuariosService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.usuariosService.obterPorId(route.paramMap.get('id'));
    }
}