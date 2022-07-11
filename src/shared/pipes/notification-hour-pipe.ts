import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'notificationHour'
})
export class NotificationHourPipe implements PipeTransform {
  transform(value: Date): string {
    let today = moment();
    let dateParam = moment(value);
    let years = today.diff(dateParam, 'years');
    let months = today.diff(dateParam, 'months');
    let days = today.diff(dateParam, 'days');
    let hours = today.diff(dateParam, 'hours');
    let minutes = today.diff(dateParam, 'minutes');
    let seconds = today.diff(dateParam, 'seconds');

    if (years === 0 && months === 0 && days === 0 && hours === 0 && minutes === 0) {
      var segundosStr = ' segundo';

      if (seconds < 30) {
        return 'Agora';
      }

      if (seconds > 1) {
        horasStr = ' segundos';
      }

      return seconds + segundosStr + ' atrás';
    }

    if (years === 0 && months === 0 && days === 0 && hours === 0) {
      return minutes + 'minutos atrás';
    }

    if (years === 0 && months === 0 && days === 0) {
      var horasStr = ' hora';
      var minutosStr = '';

      if (hours > 1) {
        horasStr = ' horas';
      }

      if (minutes > 0) {
        if (minutes > 60) {
          minutes = minutes - 60;
        }
        minutosStr = ' e ' + minutes + ' minutos';
      }

      return hours + horasStr + minutosStr + ' atrás';
    }

    if (years === 0 && months === 0) {
      var diaStr = ' dia';
      var horasStr = '';

      if (hours > 1) {
        diaStr = ' dias';
      }

      if (hours > 0) {
        if (hours > 24) {
          hours = hours - 24;
        }
        horasStr = ' e ' + hours + ' horas';
      }
      return days + diaStr + horasStr + ' atrás';
    }

    if (years === 0) {

      var mesesStr = ' mês';
      var diaStr = '';

      if (months > 1) {
        mesesStr = ' meses';
      }

      return months + mesesStr + ' atrás';
    }

    return 'Mais de ' + years + ' atrás';
  }
}
