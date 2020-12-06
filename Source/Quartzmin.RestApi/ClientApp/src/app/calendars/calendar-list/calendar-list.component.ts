import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncData, getAsyncData } from '../../utils/async-data';
import { Calendar } from '../../model/calendar';
import { CalendarService } from '../calendar.service';
import { CrudRoutes, TopLevelRoutes } from '../../app-routing.module';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  Routes = TopLevelRoutes;
  CrudRoutes = CrudRoutes;

  calendars$: Observable<AsyncData<Calendar[]>> = getAsyncData(this.calendarService.getAll());

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
  }

}
