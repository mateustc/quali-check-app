import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http/http.service';
import { CFG } from '../../config/cfg';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecoesService {

  constructor(
    private httpService: HttpService) { }

  listarSecoesPorTipo(filtros: any): Observable<any[]> {
    return this.httpService.getByFilter(CFG.build_uri('/secoes/all'), filtros);
  }
}
