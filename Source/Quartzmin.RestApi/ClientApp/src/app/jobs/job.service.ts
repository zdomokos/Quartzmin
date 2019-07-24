import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Group } from '../model/group';

import { Job } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  static readonly API_ROOT_URL = `${environment.apiRoot}/jobs`;
  static readonly JOB_DETAIL_URL = `${JobService.API_ROOT_URL}/{jobId}`;

  constructor(private http: HttpClient) { }


  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(JobService.API_ROOT_URL);
  }

  getDetail(jobId: string): Observable<Job> {
    const url = JobService.JOB_DETAIL_URL.replace('{jobId}', jobId);

    return this.http.get<Job>(url);
  }

  trigger(jobId: string): Observable<Job> {
    return null;
  }

  delete(jobId: string): Observable<void> {
    return null;
  }

  getJobGroups(): Observable<Group[]> {
    return of([
      { name: 'CRITICAL', isPaused: true },
      { name: 'DEFAULT', isPaused: false },
      { name: 'IMPORT', isPaused: true },
      { name: 'REPORTS', isPaused: false },
    ]);
  }
}
