import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AsyncData } from '../../../utils/async-data';

@Directive({
  selector: 'app-async-data-success, [appAsyncDataSuccess]',
})
export class AsyncDataSuccessDirective<T, E> implements OnChanges {
  @Input()
  appAsyncDataSuccess: AsyncData<T, E>;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appAsyncDataSuccess == null || this.appAsyncDataSuccess.state !== 'complete') {
      return;
    }

    this.container.clear();

    this.container.createEmbeddedView(this.template, {
      $implicit: this.appAsyncDataSuccess.data
    });
  }
}
