import { Component, Input, OnInit } from '@angular/core';
import { AsyncData } from '../../utils/async-data';
import { Job } from '../../model/job';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss']
})
export class JobTableComponent implements OnInit {
  @Input()
  jobs: AsyncData<Job[], any>;

  constructor() { }

  ngOnInit() {
  }

}
