import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncData } from '../../utils/async-data';
import { Calendar } from '../../model/calendar';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  calendars$: Observable<AsyncData<Calendar[]>>;

  constructor() { }

  ngOnInit() {
  }

}
