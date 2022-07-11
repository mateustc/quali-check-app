import { Injectable } from '@angular/core';
import { Usuario, Contato, Endereco, Kpi, Notificacao } from '@quali-check/models';
import { Meta } from '@quali-check/models/meta';
import { HttpService } from '../../shared/http/http.service';
import { CFG } from '../../config/cfg';
import { Observable} from 'rxjs';
import { UsuarioDto, UsuarioMedidas } from '@quali-check/dtos';
import { formatDate } from '@quali-check/utils/date-utils';
import * as _ from "lodash";
import { ResultadoPesquisaDto } from '@quali-check/dtos/resultado-pesquisa.dto';
import { PesquisaDto } from '@quali-check/dtos/pesquisa.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private httpService: HttpService) { }

  compareContatos(contato: Contato, contato2: Contato): boolean {
    return (contato.valor === contato2.valor && contato.tipoContato === contato2.tipoContato);
  }

  compareEnderecos(endereco: Endereco, endereco2: Endereco): boolean {
    return (endereco.tipoEndereco === endereco2.tipoEndereco
      && endereco.cep === endereco2.cep
      && endereco.complemento === endereco2.complemento
      && endereco.logradouro === endereco2.logradouro
      && endereco.numero === endereco2.numero
      && endereco.bairro === endereco2.bairro);
  }

  listarMinhasConexoes(id: string): Observable<Usuario[]> {
    return this.httpService.getById<Usuario[]>(CFG.build_uri('/usuarios/:id/conexoes'), id);
  }

  listarMinhasNotificacoes(id: string, dataInicial: Date | string, dataFinal: Date | string): Observable<Notificacao[]> {
    return this.httpService.getUriParams<Notificacao[]>(CFG.build_uri('/usuarios/:id/notificacoes'), {
      id: id,
      dataInicial: dataInicial,
      dataFinal: dataFinal
    });
  }

  listarMeusNotificantes(id: string): Observable<Notificacao[]> {
    return this.httpService.getById<Notificacao[]>(CFG.build_uri('/usuarios/:id/notificantes'), id);
  }

  obterPorId(id: string): Observable<Usuario> {
    return this.httpService.getById<Usuario>(CFG.build_uri('/usuarios/:id'), id);
  }

  obterKpisPorPeriodo(id: string, tipoKpi: string, periodo: string): Observable<Kpi[]> {
    return this.httpService.getUriParams(CFG.build_uri('/usuarios/:id/kpi/:tipoKpi/periodo/:periodo'), {
      id: id,
      periodo: periodo,
      tipoKpi: tipoKpi,
    });
  }

  obterKpisPorData(id: string, tipoKpi: string, data: Date | string): Observable<Kpi[]> {
    const dateParameter = formatDate(data, 'YYYY-MM-DD');
    return this.httpService.getUriParams(CFG.build_uri('/usuarios/:id/kpi/:tipoKpi/data/:data'), {
      id: id,
      data: dateParameter,
      tipoKpi: tipoKpi,
    });
  }

  obterMetaAtivaPorTipoKpi(idUsuario: string, tipoKpi: string): Observable<Meta> {
    return this.httpService.getUriParams<Meta>(CFG.build_uri('/usuarios/:id/kpi/:kpiName/metas'), {
      id: idUsuario,
      kpiName: tipoKpi
    });
  }

  obterMedidasUsuario(usuario: Usuario): UsuarioMedidas {
    const usuarioMedidas = {} as UsuarioMedidas;
    const medidas = usuario.medidas;
    if (medidas) {
      const medidaPeso = _.find(medidas, ['tipoMedida', 'PESO']);
      const medidaAltura = _.find(medidas, ['tipoMedida', 'ALTURA']);
      if (medidaPeso) {
        usuarioMedidas.peso = medidaPeso.valor;
      }
      if (medidaAltura) {
        usuarioMedidas.altura = medidaAltura.valor;
      }
      if (usuarioMedidas.peso && usuarioMedidas.altura) {
        const alturaImc = (parseInt(usuarioMedidas.altura) / 100);
        usuarioMedidas.imc = (parseInt(usuarioMedidas.peso) / (alturaImc * alturaImc)).toFixed(2);
      }
    }
    return usuarioMedidas;
  }

  criarUsuario(usuarioDto: UsuarioDto): Observable<Usuario> {

    return this.httpService
      .post<Usuario>(CFG.build_uri('/usuarios'), usuarioDto);
  }

  atualizarUsuario(id: string, usuarioDto: UsuarioDto): Observable<Usuario> {

    return this.httpService
      .put<Usuario>(CFG.build_uri('/usuarios/:id'), id, usuarioDto);
  }

  excluirUsuario(id: string): Observable<string> {
    return this.httpService.delete<string>(CFG.build_uri('/usuarios/:id'), id);
  }

  uploadImage(idUsuario: string, image: File): Observable<Response> {
    const formData = new FormData();
    formData.append('upload', image);
    return this.httpService.post(CFG.build_uri('/usuarios/:id/foto'), formData,
      {
        id: idUsuario
      }
    );
  }

  pesquisarUsuarios(pesquisaDto: PesquisaDto): Observable<ResultadoPesquisaDto> {
    return this.httpService.post(CFG.build_uri('/usuarios/pesquisarPaginado'),pesquisaDto);
  }

}
