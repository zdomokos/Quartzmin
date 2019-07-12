import { Component, OnInit } from '@angular/core';

export interface Execution {

}

@Component({
  selector: 'app-execution-list',
  templateUrl: './execution-list.component.html',
  styleUrls: ['./execution-list.component.scss']
})
export class ExecutionListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  interrupt(execution: Execution) {

  }
}
