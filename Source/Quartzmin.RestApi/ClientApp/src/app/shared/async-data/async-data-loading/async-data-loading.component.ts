import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-async-data-loading',
  templateUrl: './async-data-loading.component.html',
  styleUrls: ['./async-data-loading.component.scss']
})
export class AsyncDataLoadingComponent implements OnInit {
  @ContentChild(TemplateRef, {static: false})
  loadingTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
