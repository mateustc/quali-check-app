import { Usuario } from './usuario';
import { BaseModel } from './base-model';

export interface KpiMeta extends BaseModel {
  meta: number;
  kpi: string;
  dataCadastro: Date;
  usuario: Usuario;
}

