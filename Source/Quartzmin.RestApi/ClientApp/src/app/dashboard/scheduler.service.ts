import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerInfo } from '../model/server-info';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  static readonly API_ROOT_URL = `${environment.apiRoot}/scheduler`;

  constructor(private http: HttpClient) { }

  public getInfo(): Observable<ServerInfo> {
    return this.http.get<ServerInfo>(SchedulerService.API_ROOT_URL);
  }
}
