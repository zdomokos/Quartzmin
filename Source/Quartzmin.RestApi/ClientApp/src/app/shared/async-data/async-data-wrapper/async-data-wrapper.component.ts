import { AfterContentInit, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { AsyncData } from '../../../utils/async-data';
import { AsyncDataErrorComponent } from '../async-data-error/async-data-error.component';
import { AsyncDataLoadingComponent } from '../async-data-loading/async-data-loading.component';
import { AsyncDataSuccessComponent } from '../async-data-success/async-data-success.component';

@Component({
  selector: 'app-async-data-wrapper, [app-async-data-wrapper]',
  templateUrl: './async-data-wrapper.component.html',
  styleUrls: ['./async-data-wrapper.component.scss']
})
export class AsyncDataWrapperComponent<T, E> implements OnInit, AfterContentInit {
  @Input()
  data: AsyncData<T, E>;

  @ContentChild(AsyncDataErrorComponent, { static: false })
  errorComponent: AsyncDataErrorComponent;

  @ContentChild(AsyncDataLoadingComponent, { static: false })
  loadingComponent: AsyncDataLoadingComponent;

  @ContentChild(AsyncDataSuccessComponent, { static: false })
  successComponent: AsyncDataSuccessComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.successComponent == null) {
      throw new Error('AsyncDataSuccessComponent must be defined');
    }
  }
}
