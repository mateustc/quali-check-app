import { Query } from '@datorama/akita';
import { AuthStore } from './auth.store';
import { Autenticacao } from '@quali-check/domains/autenticacao'; 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthQuery extends Query<Autenticacao> {

  isLoggedIn$ = this.select(state => !!state.token);
  authUser$ = this.select(['id', 'nome', 'email', 'foto']);

  constructor(protected store: AuthStore) {
    super(store);
  }
}
