import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trigger } from '../../model/trigger';
import { TriggerService } from '../trigger.service';
import { AsyncData, getAsyncData } from '../../utils/async-data';

@Component({
  selector: 'app-trigger-list',
  templateUrl: './trigger-list.component.html',
  styleUrls: ['./trigger-list.component.scss']
})
export class TriggerListComponent implements OnInit {
  jobSeparator = false;
  triggers$: Observable<AsyncData<Trigger[]>>;

  job;

  constructor(private triggerService: TriggerService) { }

  ngOnInit() {
    this.triggers$ = getAsyncData(this.triggerService.getAll());
  }

  pauseAll() {

  }

  resumeAll() {

  }
}
