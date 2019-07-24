import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobService } from '../jobs/job.service';
import { Group } from '../model/group';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  data$: Observable<any> = of({});
  jobGroups$: Observable<Group[]> = this.jobService.getJobGroups();

  constructor(private jobService: JobService) {
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
