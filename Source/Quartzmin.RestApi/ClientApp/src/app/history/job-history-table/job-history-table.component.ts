import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-history-table',
  templateUrl: './job-history-table.component.html',
  styleUrls: ['./job-history-table.component.scss']
})
export class JobHistoryTableComponent implements OnInit {
  jobHistoryData;

  constructor() { }

  ngOnInit() {
  }

  getStateIcon(item): string {
    return '';
  }
}
