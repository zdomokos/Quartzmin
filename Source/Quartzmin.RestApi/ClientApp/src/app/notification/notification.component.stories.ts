import { NotificationComponent, NotificationType } from './notification.component';

export default {
  title: 'NotificationComponent',
};

export const headerOnly = () => ({
  component: NotificationComponent,
  props: {
    header: 'Test header'
  },
});

export const textOnly = () => ({
  component: NotificationComponent,
  props: {
    text: 'Some text only'
  }
});

export const headerAndText = () => ({
  component: NotificationComponent,
  props: {
    header: 'Header',
    text: 'Some text only'
  }
});

export const showCloseIcon = () => ({
  component: NotificationComponent,
  props: {
    showCloseIcon: true,
    header: 'Header',
    text: 'Some text only'
  }
});

export const none = () => getStory('');
export const success = () => getStory(NotificationType.SUCCESS);
export const info = () => getStory(NotificationType.INFO);
export const error = () => getStory(NotificationType.ERROR);
export const warning = () => getStory(NotificationType.WARNING);

const getStory = (type) => ({
  component: NotificationComponent,
  props: {
    type,
    header: 'Header',
    text: 'Some text only'
  }
});
