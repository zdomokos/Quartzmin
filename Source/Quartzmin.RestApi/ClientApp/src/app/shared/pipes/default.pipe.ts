import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDefault',
  pure: true
})
export class DefaultPipe implements PipeTransform {

  transform<I, O>(value: I, defValue: O): I|O {
    return value == null ? defValue : value;
  }

}
