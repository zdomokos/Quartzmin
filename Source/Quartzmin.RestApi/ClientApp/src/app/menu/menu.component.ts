import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems = [
    { name: 'Overview', route: 'dashboard' },
    { name: 'Jobs', route: 'jobs' },
    { name: 'Triggers', route: 'triggers' },
    { name: 'Executions', route: 'executions' },
    { name: 'History', route: 'history' },
    { name: 'Calendars', route: 'calendars' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
