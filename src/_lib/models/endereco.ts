import { BaseModel } from "./base-model";

export interface Endereco extends BaseModel{
  tipoEndereco: string;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
  cidade: string;
  uf: string;
}
