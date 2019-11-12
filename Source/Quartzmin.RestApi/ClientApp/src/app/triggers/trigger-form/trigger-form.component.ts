import { JobService } from './../../jobs/job.service';
import { TriggerService } from './../trigger.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../model/job';
import { Trigger, TriggerType } from '../../model/trigger';

const defaultValue = {
  type: TriggerType.Simple
};

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

  sharedControls = {
    repeatInterval: this.fb.control(''),
    repeatUnit: this.fb.control(''),
    repeatCount: this.fb.control(''),
    repeatForever: this.fb.control(false),
    timezone: this.fb.control(''),
  };

  specificControls = {
    [TriggerType.Cron]: this.fb.group({
      cronExpression: [''],
      timezone: this.sharedControls.timezone,
    }),
    [TriggerType.Simple]: this.fb.group({
      repeatInterval: this.sharedControls.repeatInterval,
      repeatUnit: this.sharedControls.repeatUnit,
      repeatCount: this.sharedControls.repeatCount,
      repeatForever: this.sharedControls.repeatForever,
    }),
    [TriggerType.Calendar]: this.fb.group({
      repeatInterval: this.sharedControls.repeatInterval,
      timezone: this.sharedControls.timezone,
      skipDayIfHourDoesNotExist: [false],
      preserveHourAcrossDst: [false],
    }),
    [TriggerType.Daily]: this.fb.group({
      repeatInterval: this.sharedControls.repeatInterval,
      repeatUnit: this.sharedControls.repeatUnit,
      repeatCount: this.sharedControls.repeatCount,
      repeatForever: this.sharedControls.repeatForever,
      timezone: this.sharedControls.timezone,
      startTime: [],
      endTime: [],
      daysOfWeek: this.fb.array(
        Array.from({ length: 7 }, (_, index) => this.fb.control(false))
      )
    })
  };

  form: FormGroup = this.selectFormGroup(TriggerType.Cron);

  selectedFormGroup: FormGroup = this.specificControls[TriggerType.Simple];

  isEdit: boolean;

  jobs: Job[] = [];
  groups: string[] = [];

  constructor(
    private fb: FormBuilder,
    private triggerService: TriggerService,
    private jobService: JobService,
  ) {
    this.defaultControls.get('type').valueChanges.pipe().subscribe(type => {
      this.selectedFormGroup = this.specificControls[type];
      this.form = this.selectFormGroup(type);
    });

    this.sharedControls.repeatForever.valueChanges.pipe().subscribe(repeatForever => {
      if (repeatForever) {
        this.sharedControls.repeatCount.disable();
      } else {
        this.sharedControls.repeatCount.enable();
      }
    });
  }

  selectFormGroup(type: TriggerType, defaultValues?: any) {
    const additionalControlsGroup = (type == null)
      ? this.specificControls[TriggerType.Simple]
      : this.specificControls[type];

    const form = this.fb.group({
      ...this.defaultControls.controls,
      ...additionalControlsGroup.controls,
    });

    if (defaultValues != null) {
      form.patchValue( { ...defaultValues, type }, { emitEvent: false });
    }

    return form;
  }

  ngOnInit() {
    this.triggerService.getGroups().subscribe(groups => this.groups = groups);
    this.jobService.getAll().subscribe(jobs => this.jobs = jobs);
  }

  submitForm() {
    console.log(this.form.value);
  }

  resetForm() {
    this.form.reset(defaultValue);
  }
}
