import { Usuario } from './usuario';
import { BaseModel } from './base-model';

export interface Kpi extends BaseModel {
  nome: string;
  dataColeta: Date;
  dataEnvio: Date;
  valor: number;
  unidade: string;
  usuario: Usuario;
}
