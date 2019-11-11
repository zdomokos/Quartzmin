import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-daily-trigger-form',
  templateUrl: './daily-trigger-form.component.html',
  styleUrls: ['./daily-trigger-form.component.scss']
})
export class DailyTriggerFormComponent implements OnInit {
  @Input()
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
