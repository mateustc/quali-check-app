import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http/http.service';
import { CFG } from '../../config/cfg';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituicoesService {

  constructor(
    private httpService: HttpService) { }

  obterInstituicaoPorId(resource: string, id: string): Observable<any[]> {
    return this.httpService.get(CFG.build_uri(`/${resource}/${id}`));
  }

  atualizarInstituicao(resource: string, id: string, data: any): Observable<any[]> {
    return this.httpService.put(CFG.build_uri(`/${resource}`), id, data);
  }
}
