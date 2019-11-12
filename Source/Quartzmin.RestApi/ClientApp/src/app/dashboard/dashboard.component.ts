import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobService } from '../jobs/job.service';
import { Group } from '../model/group';
import { ServerInfo } from '../model/server-info';
import { SchedulerService } from './scheduler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  data$: Observable<ServerInfo> = this.schedulerService.getInfo();
  jobGroups$: Observable<Group[]> = this.jobService.getJobGroups();
  triggerGroups$: Observable<Group[]> = this.jobService.getJobGroups();

  constructor(private jobService: JobService, private schedulerService: SchedulerService) {
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
