import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Execution } from '../model/execution';
import { Calendar } from '../model/calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  static readonly API_ROOT_URL = 'api/calendars';
  static readonly CALENDAR_DETAIL_URL = `${CalendarService.API_ROOT_URL}/{calendarId}`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(CalendarService.API_ROOT_URL);
  }

  interrupt(execution: Execution): Observable<Execution> {
    return of(execution);
  }

  update(calendar: Calendar): Observable<Calendar> {
    return this.http.put<Calendar>(CalendarService.CALENDAR_DETAIL_URL, calendar);
  }
}
