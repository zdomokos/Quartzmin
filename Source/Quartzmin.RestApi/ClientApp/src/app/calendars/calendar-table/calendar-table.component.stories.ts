import { LoadingState, wrapData, wrapError } from '../../utils/async-data';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarTableComponent } from './calendar-table.component';
import { Calendar } from '../../model/calendar';

export default {
  title: 'CalendarTableComponent',
  decorators: [
    moduleMetadata({
      imports: [ RouterTestingModule, ],
    })
  ]
};

export const loadingState = () => ({
  component: CalendarTableComponent,
  props: {
    calendars: LoadingState,
  },
});

export const errorState  = () => ({
  component: CalendarTableComponent,
  props: {
    calendars: wrapError('Some nice, long and meaningful description about the error')
  },
});


export const withEmptyData = () => ({
  component: CalendarTableComponent,
  props: {
    calendars: wrapData([])
  },
});

export const withData = () => ({
  component: CalendarTableComponent,
  props: {
    calendars: wrapData<Calendar[]>([
      {
        name: 'Just some calendar',
        description: 'Short description',
        type: 'gregorian'
      },
    ])
  },
});
