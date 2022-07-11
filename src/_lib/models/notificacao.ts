import { Usuario } from './usuario';
import { BaseModel } from './base-model';

export interface Notificacao extends BaseModel {
  grupo: string;
  tipo: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
  assunto: string;
  descricao: string;
  situacao: string;
  remetente: Usuario;
  destinatario: Usuario;
  bloqueada: boolean;
}
