import { Button } from '@storybook/angular/demo';
import { GroupActionsComponent } from './group-actions.component';

export default { title: 'GroupActionsComponent' };

export const withoutData = () => ({
  component: GroupActionsComponent,
  props: {
  },
});


export const headerOnly = () => ({
  component: GroupActionsComponent,
  props: {
    header: 'Some Header',
    groups: [],
  },
});

export const withAllData = () => ({
  component: GroupActionsComponent,
  props: {
    header: 'Some Header',
    groups: [
      { name: 'Paused', isPaused: true },
      { name: 'Running', isPaused: false },
    ],
  },
});
