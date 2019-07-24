import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-async-data-error',
  templateUrl: './async-data-error.component.html',
  styleUrls: ['./async-data-error.component.scss']
})
export class AsyncDataErrorComponent implements OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
