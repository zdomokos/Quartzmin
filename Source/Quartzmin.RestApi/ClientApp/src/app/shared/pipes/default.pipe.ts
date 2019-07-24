import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDefault',
  pure: true
})
export class DefaultPipe implements PipeTransform {

  transform(value: any, defValue: any): any {
    if (value == null) {
      return defValue;
    }

    return value;
  }

}
