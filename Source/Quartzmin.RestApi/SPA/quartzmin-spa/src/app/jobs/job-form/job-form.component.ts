import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form.value);
  }

  submitAndTrigger() {

  }

  resetForm() {
    this.form.reset();
  }
}
