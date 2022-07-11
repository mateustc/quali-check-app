import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { Observable } from 'rxjs';
import { Endereco } from '@quali-check/models';
import { HttpService } from 'shared/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpService: HttpService) { }

  buscaEndereco(cep: number): Observable<Endereco> {
    return this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
