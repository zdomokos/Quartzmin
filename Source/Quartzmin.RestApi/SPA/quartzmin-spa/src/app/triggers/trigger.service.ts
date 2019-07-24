import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trigger } from '../model/trigger';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  constructor() { }

  getAll(): Observable<Trigger[]> {

  }

  getDetail(): Observable<Trigger> {

  }

  create(trigger: Trigger): Observable<Trigger> {

  }

  update(trigger: Trigger): Observable<Trigger> {

  }
}
