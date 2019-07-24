import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Execution } from '../model/execution';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {
  static readonly API_ROOT_URL = 'executions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Execution[]> {
    return of([
      {
        job: { name: 'TEST', group: 'Group-test' },
        trigger: { name: 'Test', group: 'Group-test' },
        scheduledFireTime: 0,
        actualFireTime: 0,
        runTime: 0
      }
    ]).pipe(
      delay(2000)
    );

//    return this.http.get<Job[]>(ExecutionService.API_ROOT_URL);
  }

  interrupt(execution: Execution): Observable<Execution> {
    return of(execution);
  }
}
