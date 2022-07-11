import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Autenticacao } from '@quali-check/domains';

export function createInitialState(): Autenticacao {
  return {
    id: '',
    nome: '',
    foto: '',
    email: '',
    token: '',
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'autenticacao', resettable: true, idKey:'id' })
export class AuthStore extends Store<Autenticacao> {
  constructor() {
    super(createInitialState());
  }
}
