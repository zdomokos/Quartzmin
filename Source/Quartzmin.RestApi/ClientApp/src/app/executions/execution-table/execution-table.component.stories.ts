import { LoadingState, wrapData, wrapError } from '../../utils/async-data';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ExecutionTableComponent } from './execution-table.component';
import { Execution } from '../../model/execution';

export default {
  title: 'ExecutionTableComponent',
  decorators: [
    moduleMetadata({
      imports: [ RouterTestingModule, ],
    })
  ]
};

export const loadingState = () => ({
  component: ExecutionTableComponent,
  props: {
    executions: LoadingState,
  },
});

export const errorState  = () => ({
  component: ExecutionTableComponent,
  props: {
    executions: wrapError('Some nice, long and meaningful description about the error')
  },
});


export const withEmptyData = () => ({
  component: ExecutionTableComponent,
  props: {
    executions: wrapData([])
  },
});

export const withData = () => ({
  component: ExecutionTableComponent,
  props: {
    executions: wrapData<Execution[]>([
      {
        job: { name: 'TEST', group: 'Group-test' },
        trigger: { name: 'Test', group: 'Group-test' },
        scheduledFireTime: 0,
        actualFireTime: 0,
        runTime: 0
      }
    ])
  },
});
