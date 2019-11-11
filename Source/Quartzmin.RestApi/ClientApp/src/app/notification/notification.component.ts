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

  private _type: NotificationType;

  @Input()
  set type(value: NotificationType) {
    this._type = value;
    this.cssClass = this.getCssClass(value);
  }

  get type(): NotificationType {
    return this._type;
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
