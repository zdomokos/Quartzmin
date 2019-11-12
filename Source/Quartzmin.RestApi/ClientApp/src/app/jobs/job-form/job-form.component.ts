import { JobService } from './../job.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    group: [''],
    type: ['', Validators.required],
    description: [''],
    recovery: [false],
    dataMap: this.fb.array([])
  });

  isEdit = false;

  jobTypes: any[];
  jobGroups: any[];

  defaultValue = {};

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private jobService: JobService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      filter(routeParams => routeParams.hasOwnProperty('jobId')),
      map(routeParams => routeParams.jobId),
      filter(jobId => jobId != null),
      switchMap(jobId => this.jobService.getDetail(jobId)),
    ).subscribe((job: any) => {
      this.defaultValue = {
        name: job.name,
        group: job.group,
        class: job.jobType,
        recovery: job.requestsRecovery,
        description: job.description,
      };

      this.form.patchValue(this.defaultValue);
    });

    this.jobService.getGroupNames().subscribe(groups => this.jobGroups = groups);
  }

  submitForm() {
    console.log(this.form.value);

    if (!this.form.valid) {
      return;
    }

    console.log(this.form.value);
  }

  submitAndTrigger() {

  }

  resetForm() {
    this.form.reset(this.defaultValue);
  }
}
