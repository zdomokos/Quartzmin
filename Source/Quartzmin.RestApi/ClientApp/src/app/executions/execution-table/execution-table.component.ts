import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncData } from '../../utils/async-data';
import { Execution } from '../../model/execution';

@Component({
  selector: 'app-execution-table',
  templateUrl: './execution-table.component.html',
  styleUrls: ['./execution-table.component.scss']
})
export class ExecutionTableComponent implements OnInit {
  @Input()
  executions: AsyncData<Execution[]>;

  @Output()
  interrupt = new EventEmitter<Execution>();

  constructor() { }

  ngOnInit() {
  }

}
