import { JobTableComponent } from './job-table.component';
import { LoadingState, wrapData, wrapError } from '../../utils/async-data';
import { Job } from '../../model/job';
import { moduleMetadata } from '@storybook/angular';
import { RouterModule } from '@angular/router';
import { DatePipe } from '../../shared/pipes/date.pipe';
import { HistogramComponent } from '../../histogram/histogram.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'JobTableComponent',
  decorators: [
    moduleMetadata({
      imports: [ RouterTestingModule, ],
      declarations: [ DatePipe, HistogramComponent, ]
    })
  ]
};

export const loadingState = () => ({
  component: JobTableComponent,
  props: {
    jobs: LoadingState,
  },
});

export const errorState  = () => ({
  component: JobTableComponent,
  props: {
    jobs: wrapError('Some nice, long and meaningful description about the error')
  },
});


export const withEmptyData = () => ({
  component: JobTableComponent,
  props: {
    jobs: wrapData([])
  },
});

export const withData = () => ({
  component: JobTableComponent,
  props: {
    jobs: wrapData<Job[]>([
      {
        concurrent: false,
        description: 'test descr',
        group: 'test group',
        name: 'test name',
        recovery: false,
        persist: false,
        type: 'some type',
        history: [],
        nextFireTime: new Date(),
      },
      {
        concurrent: true,
        description: 'test descr',
        group: 'test group',
        name: 'test name',
        recovery: true,
        persist: true,
        type: 'some type',
        history: [],
        nextFireTime: new Date(),
      }
    ])
  },
});
