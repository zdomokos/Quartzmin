import { Component, Input } from '@angular/core';

export enum NotificationType {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}

enum NotificationClass {
  ERROR = 'negative',
  INFO = 'info',
  SUCCESS = 'positive',
  DEFAULT = '',
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  cssClass: NotificationClass = NotificationClass.INFO;

  @Input()
  header: string;

  @Input()
  text: string;

  @Input()
  set type(value: NotificationType) {
    this.cssClass = this.getCssClass(value);
  }

  @Input()
  showCloseIcon = false;


  private getCssClass(notification: NotificationType): NotificationClass {
    switch (notification) {
      default:
        return NotificationClass.DEFAULT;
      case NotificationType.ERROR:
        return NotificationClass.ERROR;
      case NotificationType.WARNING:
        return NotificationClass.ERROR;
      case NotificationType.SUCCESS:
        return NotificationClass.SUCCESS;
      case NotificationType.INFO:
        return NotificationClass.INFO;
    }
  }
}
