import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  data$: Observable<any> = of({});

  constructor() {
  }

  ngOnInit() {
  }

  resumeAll() {

  }

  pauseAll() {

  }

  shutdown() {
    // TODO: First show confirm dialog
  }

  start() {

  }

  standBy() {

  }
}
