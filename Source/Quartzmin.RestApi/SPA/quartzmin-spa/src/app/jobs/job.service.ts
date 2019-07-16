import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './job';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  static readonly API_ROOT_URL = 'jobs';
  static readonly JOB_DETAIL_URL = `${JobService.API_ROOT_URL}/{jobId}`;

  constructor(private http: HttpClient) { }


  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(JobService.API_ROOT_URL);
  }

  getDetail(jobId: string): Observable<Job> {
    const url = JobService.JOB_DETAIL_URL.replace('{jobId}', jobId);

    return this.http.get<Job>(url);
  }
}
