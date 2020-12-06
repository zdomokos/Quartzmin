import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {
  @Input()
  heading = 'Nothing to see here...';

  @Input()
  subtext = null;

  constructor() { }

  ngOnInit() {
  }

}
