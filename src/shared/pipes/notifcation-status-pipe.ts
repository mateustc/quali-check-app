import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notificationStatusPipe'
})
export class NotificationStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    return value === true ? 'status online' : 'status no-disturb';
  }
}
