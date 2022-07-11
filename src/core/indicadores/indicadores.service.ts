import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http/http.service';
import { CFG } from '../../config/cfg';
import { Observable } from 'rxjs';
import { ResultadoIndicadorDto } from '@quali-check/dtos/resultado-indicador.dto';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  constructor(private httpService: HttpService) {
    
  }

  obterIndicador(nome: string, params: any): Observable<ResultadoIndicadorDto> {
    return this.httpService.post(CFG.build_uri(`/indicadores/${nome}`), params);
  }
}