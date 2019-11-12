import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  isEdit;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
