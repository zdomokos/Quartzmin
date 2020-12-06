import { storiesOf } from '@storybook/angular';
import { JobHistoryTableComponent } from './job-history-table.component';

storiesOf('/JobHistoryTableComponent', module)
  .add('default', () => ({
    component: JobHistoryTableComponent
  }));
