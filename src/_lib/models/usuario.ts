import { UsuarioPerfil } from '../domains/usuario-perfil';
import { Medida } from '../models/medida';
import { Contato } from '../models/contato';
import { Endereco } from '../models/endereco';
import { BaseModel } from './base-model';

export interface Usuario extends BaseModel{
  email: string;
  nome: string;
  dataNascimento: Date;
  foto: string;
  sexo: string;
  senha: string;
  ativo: boolean;
  perfil: UsuarioPerfil;
  medidas: Array<Medida>;
  contatos: Array<Contato>;
  enderecos: Array<Endereco>;
  profissao: string;
  areasAtuacao: Array<string>;
  bio: string;
  conexoes: Array<Usuario>;
}
