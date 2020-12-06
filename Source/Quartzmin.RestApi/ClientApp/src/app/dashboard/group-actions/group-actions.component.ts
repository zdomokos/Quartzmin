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

  getGroupClass(group: Group): string {
    return group.isPaused ? 'paused' : 'resumed';
  }

  getButtonClass(group: Group): string {
    return group.isPaused ? 'play' : 'pause';
  }

  getGroupText(group: Group): string {
    return group.isPaused ? 'Resume' : 'Pause';
  }
}
