import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AsyncData } from '../../../utils/async-data';

@Directive({
  selector: '[appAsyncDataLoading]'
})
export class AsyncDataLoadingDirective implements OnChanges {
  @Input()
  appAsyncDataLoadingOf: AsyncData<any, any>;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appAsyncDataLoadingOf == null || this.appAsyncDataLoadingOf.state !== 'loading') {
      return;
    }

    this.container.clear();

    this.container.createEmbeddedView(this.template);
  }
}
