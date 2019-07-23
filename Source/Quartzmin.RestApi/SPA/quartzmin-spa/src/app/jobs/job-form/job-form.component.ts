import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  form: FormGroup;

  isEdit = false;

  jobTypes: any[];
  jobGroups: any[];

  constructor() { }

  ngOnInit() {
  }

  resetForm() {

  }
}
