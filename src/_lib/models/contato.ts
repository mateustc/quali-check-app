import { BaseModel } from "./base-model";

export interface Contato extends BaseModel{
    tipoContato: string;
    valor: string;
}
