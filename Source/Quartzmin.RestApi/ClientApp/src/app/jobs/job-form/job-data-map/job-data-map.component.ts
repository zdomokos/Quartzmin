import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DataType, DataTypeMap } from './data-types';

@Component({
  selector: 'app-job-data-map',
  templateUrl: './job-data-map.component.html',
  styleUrls: ['./job-data-map.component.scss']
})
export class JobDataMapComponent implements OnInit {
  @Input()
  form: FormGroup;

  supportedTypes = DataTypeMap;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addItem();
  }

  get dataMap() {
    return this.form.get('dataMap') as FormArray;
  }


  addItem() {
    this.dataMap.push(this.createItem());
  }

  createItem(defaultValues?: any) {
    const group = this.fb.group({
      name: [''],
      type: [''],
      value: [null],
    });

    if (defaultValues != null) {
      group.patchValue(defaultValues);
    }

    return group;
  }

  cloneItem(index: number) {
    this.dataMap.insert(index + 1, this.createItem(this.dataMap.at(index).value));
  }

  removeItem(index: number) {
    this.dataMap.removeAt(index);
  }
}
