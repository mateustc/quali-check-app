import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http/http.service';
import { CFG } from '../../config/cfg';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  constructor(
    private httpService: HttpService) { }

  listarTodosAgendamentos(filtro: any): Observable<any[]> {
    return this.httpService.getByFilter(CFG.build_uri('/agendamentos/all'), filtro);
  }

  atualizarAgendamento(id: string, data: any): Observable<any[]> {
    return this.httpService.put(CFG.build_uri('/agendamentos'), id, data);
  }
}
