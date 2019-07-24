import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Group } from '../../model/group';

@Component({
  selector: 'app-group-actions',
  templateUrl: './group-actions.component.html',
  styleUrls: ['./group-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupActionsComponent implements OnInit {
  @Input()
  header: string;

  @Input()
  groups: Group[];

  constructor() { }

  ngOnInit() {
  }

  getGroupClass(group: Group) {
    if (group.isPaused) {
      return 'paused';
    }

    return 'resumed';
  }

  getButtonClass(group: Group) {
    if (group.isPaused) {
      return 'pause';
    }

    return 'play';
  }
}
