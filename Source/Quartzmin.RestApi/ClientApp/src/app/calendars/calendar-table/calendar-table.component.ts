import { Component, Input, OnInit } from '@angular/core';
import { AsyncData } from '../../utils/async-data';
import { Calendar } from '../../model/calendar';

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss']
})
export class CalendarTableComponent implements OnInit {
  @Input()
  calendars: AsyncData<Calendar[]>;

  constructor() { }

  ngOnInit() {
  }

}
