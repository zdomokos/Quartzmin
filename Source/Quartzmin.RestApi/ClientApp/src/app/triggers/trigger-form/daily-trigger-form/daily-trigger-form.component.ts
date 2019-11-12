import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getLocaleFirstDayOfWeek } from '@angular/common';

interface DayOfWeek {
  id: number;
  name: string;
}

@Component({
  selector: 'app-daily-trigger-form',
  templateUrl: './daily-trigger-form.component.html',
  styleUrls: ['./daily-trigger-form.component.scss']
})
export class DailyTriggerFormComponent implements OnInit {
  @Input()
  formGroup: FormGroup;
  daysOfWeek = this.getDaysOfWeek();

  constructor() { }

  ngOnInit() {
  }

  getDaysOfWeek(): DayOfWeek[] {
    const locale = navigator.language;

    return Array.from({ length: 7 }).map((_, index) => ({
      id: index,
      name: new Date(1970, 1 - 1, index + 5).toLocaleString(locale, { weekday: 'long' })
    }));
  }
}
