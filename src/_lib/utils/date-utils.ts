import * as moment from 'moment';
import { Periodos } from '../domains/periodos';

const DATE_TEXT_PATTERN: string = 'DD/MM/YYYY';

// 'YYYY-MM-DDTHH:mm:ss[Z]'
export class DateUtcStr {
  dateUtcStr: string;

  constructor(dateUtcStr: string) {
    this.dateUtcStr = dateUtcStr;
  }

  private extractPart(start: number, length?: number): string {
    return this.dateUtcStr.substr(start, length);
  }

  get year(): string {
    return this.extractPart(0,4);
  }

  get month(): string {
    return this.extractPart(5,2);
  }

  get hour(): string {
    return this.extractPart(11,2);
  }

  get minute(): string {
    return this.extractPart(14,2);
  }

  get second(): string {
    return this.extractPart(17,2);
  }

  get day(): string {
    return this.extractPart(8,2);
  }

}

export function strToPeriodo(periodo: string): Periodos {
  return Periodos[periodo];
}

export function formatPeriodoToStr(periodo: string, ): string {
  const periodos = strToPeriodo(periodo);
  const datas = extractDatasPeriodo(periodos, '');
  const dataInicialStr = formatDate(datas.dataInicial, DATE_TEXT_PATTERN);
  const dataFinalStr = formatDate(datas.dataFinal, DATE_TEXT_PATTERN);
  return `${dataInicialStr} - ${dataFinalStr}`;
}

export function now(): Date {
  return momentUTC().toDate();
}

export function dateDiff(date1: Date, date2: Date, medida: any): number{
  return momentUTC(date2).diff(momentUTC(date1), medida);
}

export function nowToStr(): string {
  return formatDate(now(), DATE_TEXT_PATTERN);
}

export function getDatasIntervaloPeriodo(periodo: string, intervalo: string): object {
  const periodos = strToPeriodo(periodo);
  return extractDatasPeriodo(periodos, intervalo);
}

export function momentUTC(date?: Date | string): moment.Moment {
  return (date)? moment(date).utc(): moment().utc();
}

export function parseDate(dataStr: string, pattern?: string): Date {
  if (!pattern) {
    pattern = 'DD/MM/YYYY';
  }
  return moment(dataStr, pattern).toDate();
}

export function formatDate(data: Date | string, pattern?: string, utc?: boolean): string {
  if (!pattern) {
    pattern = 'YYYY-MM-DD HH:mm:ss';
  }
  if(utc){
    return momentUTC(data).format(pattern);
  }
  return moment(data).format(pattern);
}

export function extractDatasPeriodo(periodo: Periodos, intervalo: string): any {
  let dataInicial: Date;
  let dataFinal: Date;
  switch (periodo) {
    case Periodos.HOJE: {
      dataInicial = momentUTC().startOf('day').toDate();
      dataFinal = momentUTC().endOf('day').toDate();
      break;
    }
    case Periodos.SEMANA_ATUAL: {
      dataInicial = momentUTC().startOf('week').toDate();
      dataFinal = momentUTC().endOf('week').toDate();
      break;
    }
    case Periodos.ULTIMOS_SETE_DIAS: {
      dataInicial = momentUTC().subtract(7, 'days').startOf('day').toDate();
      dataFinal = momentUTC().subtract(1, 'days').endOf('day').toDate();
      break;
    }
    case Periodos.ULTIMOS_QUINZE_DIAS: {
      dataInicial = momentUTC().subtract(15, 'days').startOf('day').toDate();
      dataFinal = momentUTC().subtract(1, 'days').endOf('day').toDate();
      break;
    }
    case Periodos.ULTIMOS_TRINTA_DIAS: {
      dataInicial = momentUTC().subtract(30, 'days').startOf('day').toDate();
      dataFinal = momentUTC().subtract(1, 'days').endOf('day').toDate();
      break;
    }
    case Periodos.MES_ATUAL: {
      dataInicial = momentUTC().startOf('month').toDate();
      dataFinal = momentUTC().endOf('month').toDate();
      break;
    }
    case Periodos.INTERVALO: {
      const values = intervalo.split(' - ');
      dataInicial = moment(`${values[0]} 00:00:00`, 'DD/MM/YYYY HH:mm:ss').toDate();
      dataFinal = moment(`${values[1]} 23:59:59`, 'DD/MM/YYYY HH:mm:ss').toDate();
      break;
    }
  }
  return {
    dataInicial: dataInicial,
    dataFinal: dataFinal
  };
}