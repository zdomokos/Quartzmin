import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appUrlEncode',
  pure: true
})
export class UrlEncodePipe implements PipeTransform {

  transform(value: string): string {
    return encodeURIComponent(value);
  }
}
