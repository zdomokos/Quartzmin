import { Component, Input, OnInit } from '@angular/core';
import { DataType, DataTypeKeys, DataTypeMap } from '../job-data-map/data-types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DataInputComponent,
    multi: true,
  }]
})
export class DataInputComponent implements ControlValueAccessor {
  @Input()
  type: keyof typeof DataType;

  @Input()
  placeholder: string;

  value;
  valueChangeCallback: any;

  // : Partial<{ [key in keyof typeof DataType]: string }>
  DataType = DataTypeKeys;

  constructor() { }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.valueChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  propagateChangedValue(value) {
    if (typeof this.valueChangeCallback === 'function') {
      this.valueChangeCallback(value);
    }
  }
}
