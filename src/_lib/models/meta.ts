import { BaseModel } from './base-model';
import { Usuario } from '../models/usuario';

export interface Meta extends BaseModel {
  kpiName: string;
  valor: number;
  dataCadastro: Date;
  ativo: boolean;
  usuario: Usuario;
}