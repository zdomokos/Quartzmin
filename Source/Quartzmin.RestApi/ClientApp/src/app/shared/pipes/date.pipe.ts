import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDate',
  pure: true
})
export class DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(value: any, format: string = 'd/M/yyyy hh:mm:ss', timezone?: string, locale?: string): any {
    if (value == null || value === '' || value !== value) {
      return null;
    }

    return formatDate(value, format, locale || this.locale, timezone);
  }
}
