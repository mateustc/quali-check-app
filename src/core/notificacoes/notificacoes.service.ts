import { Injectable } from '@angular/core';
import { Notificacao } from '@quali-check/models/notificacao';
import { HttpService } from '../../shared/http/http.service';
import { NotificacaoDto } from '@quali-check/dtos/notificacao.dto';
import { Observable } from 'rxjs';
import { CFG } from 'config/cfg';
import * as _ from "lodash";
import { formatDate } from '@quali-check/utils/date-utils';
import { CountNotificationDto } from '@quali-check/dtos/countNotification.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {

  constructor(
    private httpService: HttpService
  ) { }

  getCountValue(notificacoes: Notificacao[]): CountNotificationDto {
    let countNotificationDto: CountNotificationDto = this.createNotificationCountDto();
    if (notificacoes) {
      this.populateNotificationDto(countNotificationDto, notificacoes);
    }
    return countNotificationDto;
  }

  private createNotificationCountDto(): CountNotificationDto {
    let countNotificationDto = {} as CountNotificationDto;
    countNotificationDto.valor = null;
    countNotificationDto.dataNotificacao = null;
    return countNotificationDto;
  }

  private populateNotificationDto(countNotificationDto: CountNotificationDto, notificacoes: Notificacao[]): CountNotificationDto {
    countNotificationDto.valor = notificacoes.length;
    countNotificationDto.dataNotificacao = formatDate(notificacoes[0].dataCadastro, 'YYYY-MM-DD HH:mm:ss', true);
    return countNotificationDto;
  }

  private copiarCamposNotificacaoResposta(notificacaoRemetente: Notificacao, notificacaoDto: NotificacaoDto, copiaAssunto: boolean): void {
    if (copiaAssunto) {
      notificacaoDto.assunto = notificacaoRemetente.assunto;
    }
    notificacaoDto.grupo = notificacaoRemetente.grupo;
    notificacaoDto.destinatario = notificacaoRemetente.remetente._id;
    notificacaoDto.remetente = notificacaoRemetente.destinatario._id;
  }

  aceitar(notificacaoRemetente: Notificacao, notificacaoDto: NotificacaoDto): Observable<Notificacao> {
    notificacaoDto.situacao = 'ACEITA';
    notificacaoDto.tipo = 'CONEXAO';
    this.copiarCamposNotificacaoResposta(notificacaoRemetente, notificacaoDto, true);
    return this.cadastrarNotificacao(notificacaoDto);
  }

  rejeitar(notificacaoRemetente: Notificacao, notificacaoDto: NotificacaoDto): Observable<Notificacao> {
    notificacaoDto.situacao = 'REJEITADA';
    notificacaoDto.tipo = 'CONEXAO';
    this.copiarCamposNotificacaoResposta(notificacaoRemetente, notificacaoDto, true);
    return this.cadastrarNotificacao(notificacaoDto);
  }

  notificar(notificacaoRemetente: Notificacao, notificacaoDto: NotificacaoDto): Observable<Notificacao> {
    notificacaoDto.tipo = 'MENSAGEM';
    notificacaoDto.situacao = 'ENVIADA';
    this.copiarCamposNotificacaoResposta(notificacaoRemetente, notificacaoDto, false);
    return this.cadastrarNotificacao(notificacaoDto);
  }

  cadastrarNotificacao(notificacaoDto: NotificacaoDto): Observable<Notificacao> {
    return this.httpService.post<Notificacao>(CFG.build_uri('/notificacoes'), notificacaoDto);
  }

  listarMensagensNotificacoesUsuarios(idUsuarioRemetente: string, idUsuarioDestinatario: string): Observable<Notificacao[]> {
    return this.httpService.getUriParams<Notificacao[]>(
        CFG.build_uri('/usuarios/:id/:idNotificante/notificacoes/mensagens'),
        {
          id: idUsuarioRemetente,
          idNotificante: idUsuarioDestinatario
        }
    );
  }

  

isSolicitacaoConexao(notificacao: Notificacao): boolean {
  if (notificacao) {
    const situacao = notificacao.situacao.toUpperCase();
    const tipo = notificacao.tipo.toUpperCase();
    return tipo === 'CONEXAO' && situacao === 'SOLICITADA';
  }
  return false;
}

isBloqueada(notificacao: Notificacao): boolean {
  if (notificacao.bloqueada) {
    return true;
  }
  return false;
}

isSolicitacaoBloqueada(notificacao: Notificacao): boolean {
  if (!this.isSolicitacaoConexao(notificacao) || this.isBloqueada(notificacao)) {
    return true;
  }
  return false;
}

isMinhaNotificacao(notificacao: Notificacao, idUsuario: string): boolean {
  return (notificacao && notificacao.remetente._id === idUsuario);
}
}
