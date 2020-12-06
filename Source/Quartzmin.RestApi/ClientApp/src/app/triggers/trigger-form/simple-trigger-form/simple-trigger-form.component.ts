import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simple-trigger-form',
  templateUrl: './simple-trigger-form.component.html',
  styleUrls: ['./simple-trigger-form.component.scss']
})
export class SimpleTriggerFormComponent implements OnInit {
  @Input()
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
