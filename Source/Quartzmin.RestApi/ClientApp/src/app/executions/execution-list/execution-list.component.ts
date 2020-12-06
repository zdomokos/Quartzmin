import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Execution } from '../../model/execution';
import { AsyncData, getAsyncData } from '../../utils/async-data';
import { ExecutionService } from '../execution.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-execution-list',
  templateUrl: './execution-list.component.html',
  styleUrls: ['./execution-list.component.scss']
})
export class ExecutionListComponent implements OnInit {
  executions$: Observable<AsyncData<Execution[]>>;

  constructor(
    private executionService: ExecutionService
  ) {
  }

  ngOnInit() {
    this.executions$ = getAsyncData(this.executionService.getAll()).pipe(tap(data => console.log(data)));
//    this.executions$;
  }


  interrupt(execution: Execution) {

  }
}
