import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { JobService } from '../job.service';
import { AsyncData, getAsyncData } from '../../utils/async-data';
import { Job } from '../job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs$: Observable<AsyncData<Job[], any>>;

  constructor(private service: JobService) { }

  ngOnInit() {
    this.jobs$ = getAsyncData(this.service.getAll());
  }

}
