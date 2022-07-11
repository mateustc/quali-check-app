import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthStore } from './auth.store';
import { tap } from 'rxjs/operators';
import { AuthQuery } from './auth.query';
import { Autenticacao } from '@quali-check/domains';
import * as jwt_decode from 'jwt-decode';
import { HttpService } from 'shared/http/http.service';
import { CFG } from 'config/cfg';
import { StorageService } from 'shared/storage/storage.service';
import { Usuario } from '@quali-check/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService: StorageService,
    private authQuery: AuthQuery,
    private authStore: AuthStore,
    private httpService: HttpService
  ) { }

  isLoggedIn(): Observable<boolean> {
    return this.authQuery.isLoggedIn$;
  }

  login(username: string, password: string): Observable<any> {
    return this.httpService.post<Autenticacao>(CFG.build_uri('/auth/login'), {
      username: username,
      password: password
    }).pipe(tap((autenticacao: any) => {
      this.startSession(autenticacao);
    }));
  }

  recuperarSenha(username: string): Observable<any> {
    return this.httpService.put<Usuario>(CFG.build_uri('/recuperar-senha/:id'), username, {});
  }

  logout() {
    this.authStore.reset();
    this.storageService.clear();
  }

  getAuth(): Autenticacao {
    return this.authQuery.getValue();
  }

  getAuthUser(): Observable<any> {
    return this.authQuery.authUser$;
  }

  startSession(autenticacao: Autenticacao) {
    this.authStore.update(this.buildAuthForStorage(autenticacao));
    this.storageService.set("_auth", autenticacao);
  }

  loadMenuItens(): any[]{
    return CFG.menu_itens;
  }

  async restoreSession(): Promise<Autenticacao> {
    const autenticacao = await this.storageService.get("_auth");
    if (autenticacao) {
      this.startSession(autenticacao);
    }
    return Promise.resolve(autenticacao);
  }

  private buildAuthForStorage(autenticacao: Autenticacao): any {
    const dataToken = this.decodeToken(autenticacao.token);
    return {
      id: dataToken.sub, 
      nome: autenticacao.nome,
      email: dataToken.email, 
      foto: autenticacao.foto, 
      token: autenticacao.token 
    }
  }

  private decodeToken(token: string): any {
    return jwt_decode(token);
  }
}
