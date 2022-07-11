import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: Date): string {
    let today = moment();
    let birthdate = moment(value);
    let years = today.diff(birthdate, 'years');
    let yearsStr = " ano";

    if (birthdate >= today) {
      years++;
    }

    if (years > 1) {
      yearsStr = " anos";
    }
    return years + yearsStr;
  }
}
