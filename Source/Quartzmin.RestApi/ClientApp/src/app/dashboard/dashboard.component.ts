import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobService } from '../jobs/job.service';
import { Group } from '../model/group';
import { ServerInfo } from '../model/server-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  data$: Observable<ServerInfo> = of({
    machineName: 'notebook',
    application: 'scheduler',

    inStandByMode: true,
    runningSince: new Date(),
    shutdown: false,
    started: true,

    jobsCount: 10,
    triggersCount: 10,

    scheduler: {
      name: 'quartz',
      instanceId: '1',
      remote: 'xyz',
      type: 'asddasda',
      version: '2.01',
    },
    jobStore: {
      clustered: false,
      supportsPersistence: false,
      type: 'asdasdas',
    },
    threadPool: {
      size: 4,
      type: 'xyzadda',
    },
    jobs: {
      countExecuted: 10,
      countFailed: 3,
      countRunning: 1
    }
  });
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
