export interface NotificacaoDto {
    grupo: string;
    tipo: string;
    dataCadastro: Date;
    dataAtualizacao: Date;
    assunto: string;
    descricao: string;
    situacao: string;
    remetente: string;
    destinatario: string;
}
