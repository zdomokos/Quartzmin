import { AfterContentInit, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { AsyncData } from '../../../utils/async-data';
import { AsyncDataErrorComponent } from '../async-data-error/async-data-error.component';
import { AsyncDataLoadingComponent } from '../async-data-loading/async-data-loading.component';
import { AsyncDataSuccessComponent } from '../async-data-success/async-data-success.component';

@Component({
  selector: 'app-async-data-wrapper',
  templateUrl: './async-data-wrapper.component.html',
  styleUrls: ['./async-data-wrapper.component.scss']
})
export class AsyncDataWrapperComponent<T, E> implements OnInit, AfterContentInit {
  @Input()
  data: AsyncData<T, E>;

  @ContentChild(AsyncDataErrorComponent, { static: true })
  errorComponent;

  @ContentChild(AsyncDataLoadingComponent, { static: true })
  loadingComponent;

  @ContentChild(AsyncDataSuccessComponent, { static: true })
  successComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.successComponent == null) {
      throw new Error('AsyncDataSuccessComponent must be defined');
    }
  }
}
