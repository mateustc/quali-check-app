import { Store, StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Usuario } from '@quali-check/models';

export interface UsuarioState extends EntityState<Usuario> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'usuario' })
export class UsuariosStore extends EntityStore<UsuarioState> {
  constructor() {
    super();
  }
}
