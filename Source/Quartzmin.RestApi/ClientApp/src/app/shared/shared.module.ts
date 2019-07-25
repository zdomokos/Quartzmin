import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncDataWrapperComponent } from './async-data/async-data-wrapper/async-data-wrapper.component';
import { AsyncDataErrorDirective } from './async-data/async-data-error/async-data-error-directive.component';
import { AsyncDataSuccessDirective } from './async-data/async-data-success/async-data-success.directive';
import { AsyncDataLoadingDirective } from './async-data/async-data-loading/async-data-loading.directive';
import { DatePipe } from './pipes/date.pipe';
import { DefaultPipe } from './pipes/default.pipe';

export const declareAndExport = [
  AsyncDataWrapperComponent,
  AsyncDataErrorDirective,
  AsyncDataSuccessDirective,
  AsyncDataLoadingDirective
];


@NgModule({
  declarations: [
    ...declareAndExport,
    DatePipe,
    DefaultPipe
  ],
  exports: [
    ...declareAndExport,
    DatePipe,
    DefaultPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
