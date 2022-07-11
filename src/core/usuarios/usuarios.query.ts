import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UsuarioState, UsuariosStore } from './usuarios.store';

@Injectable({
  providedIn: 'root'
})
export class UsuariosQuery extends QueryEntity<UsuarioState> {

  constructor(protected store: UsuariosStore) {
    super(store);
  }
}
