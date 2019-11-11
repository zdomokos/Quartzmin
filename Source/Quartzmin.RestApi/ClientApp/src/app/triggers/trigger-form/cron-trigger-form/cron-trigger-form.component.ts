import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cron-trigger-form',
  templateUrl: './cron-trigger-form.component.html',
  styleUrls: ['./cron-trigger-form.component.scss']
})
export class CronTriggerFormComponent implements OnInit {
  @Input()
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
