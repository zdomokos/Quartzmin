import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar-trigger-form',
  templateUrl: './calendar-trigger-form.component.html',
  styleUrls: ['./calendar-trigger-form.component.scss']
})
export class CalendarTriggerFormComponent implements OnInit {
  @Input()
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
