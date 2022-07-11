import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Autenticacao } from '@quali-check/domains';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthResolve implements Resolve<Autenticacao>{

    constructor(
        private authService: AuthService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.authService.getAuth();
    }
}