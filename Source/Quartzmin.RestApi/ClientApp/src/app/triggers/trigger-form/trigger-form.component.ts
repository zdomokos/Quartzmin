import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../model/job';
import { TriggerType } from '../../model/trigger';

@Component({
  selector: 'app-trigger-form',
  templateUrl: './trigger-form.component.html',
  styleUrls: ['./trigger-form.component.scss']
})
export class TriggerFormComponent implements OnInit {
  defaultControls = this.fb.group({
    name: ['', Validators.required],
    group: [''],
    job: [''],
    description: [''],
    type: [TriggerType.Simple, Validators.required],
    startDate: [],
    endDate: [],
    calendarName: [],
    misfireInstructions: [],
    priority: [],

    dataMap: this.fb.array([]),
  });

  form: FormGroup = this.createFormGroup(TriggerType.Cron);

  isEdit: boolean;

  jobs: Job[] = [];
  groups: string[] = [];

  constructor(private fb: FormBuilder) {
    this.defaultControls.get('type').valueChanges.pipe().subscribe(type => {
      this.form = this.createFormGroup(type, this.form.value);
    });
/*
    this.form.get('repeatForever').valueChanges.pipe().subscribe(repeatForever => {
      if (repeatForever) {
        this.form.get('repeatCount').disable();
      } else {
        this.form.get('repeatCount').enable();
      }
    });
 */
  }

  createFormGroup(type: TriggerType, defaultValues?: any) {
    let additionalControls;

    switch (type) {
      default:
      case TriggerType.Simple:
        additionalControls = {
          repeatInterval: [],
          repeatUnit: [],
          repeatCount: [],
          repeatForever: [false],
        };
        break;
      case TriggerType.Calendar:
        additionalControls = {
          repeatInterval: [],
          timezone: [],
        };
        break;
      case TriggerType.Daily:
        additionalControls = {
          repeatInterval: [],
          repeatUnit: [],
          repeatCount: [],
          repeatForever: [],
          timezone: [],
          startTime: [],
          endTime: [],
        };
        break;
      case TriggerType.Cron:
        additionalControls = {
          cronExpression: [''],
          timezone: [],
        };
        break;
    }

    const form = this.fb.group({
      ...this.defaultControls.controls,
      ...additionalControls,
    });

    if (defaultValues != null) {
      form.patchValue(defaultValues);
    }

    return form;
  }

  ngOnInit() {
  }

  submitForm() {
    console.log(this.form.value);
  }

  resetForm() {

  }
}
