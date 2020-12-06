import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AsyncData } from '../../../utils/async-data';

@Directive({
  selector: '[appAsyncDataError]'
})
export class AsyncDataErrorDirective implements OnChanges {
  @Input()
  appAsyncDataError: AsyncData<any, any>;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appAsyncDataError == null || this.appAsyncDataError.state !== 'error') {
      return;
    }

    this.container.clear();

    this.container.createEmbeddedView(this.template, {
      $implicit: this.appAsyncDataError.error,
    });
  }
}
