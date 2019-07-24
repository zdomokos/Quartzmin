import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Trigger } from '../model/trigger';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  static readonly API_ROOT_URL = `${environment.apiRoot}/triggers`;
  static readonly DETAIL_URL = `${TriggerService.API_ROOT_URL}/{triggerId}`;

  constructor(private http: HttpClient) { }


  getAll(): Observable<Trigger[]> {
    return this.http.get<Trigger[]>(TriggerService.API_ROOT_URL);
  }

  getDetail(): Observable<Trigger> {
    return null;

  }

  create(trigger: Trigger): Observable<Trigger> {
    return null;

  }

  update(trigger: Trigger): Observable<Trigger> {
    return null;
  }
}
