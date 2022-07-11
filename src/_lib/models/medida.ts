import { BaseModel } from "./base-model";

export interface Medida extends BaseModel{
  tipoMedida: string;
  valor: string;
  unidade: string;
}
