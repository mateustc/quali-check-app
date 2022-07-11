
import { UsuarioPerfil } from '../domains/usuario-perfil';
import { Medida } from '../models/medida';
import { Contato } from '../models/contato';
import { Endereco } from '../models/endereco';

export interface UsuarioDto {
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
  areasAtuacao: string[];
  bio: string;
  conexoes: string[];
}
