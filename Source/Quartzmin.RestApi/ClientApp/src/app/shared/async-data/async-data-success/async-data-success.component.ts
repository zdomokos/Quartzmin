import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-async-data-success, [app-async-data-success]',
  templateUrl: './async-data-success.component.html',
  styleUrls: ['./async-data-success.component.scss']
})
export class AsyncDataSuccessComponent implements OnInit {
  @ContentChild(TemplateRef, {static: false})
  successTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
