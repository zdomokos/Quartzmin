import { Component, Input, OnInit } from '@angular/core';
import { DataType } from '../job-data-map/data-types';
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
  type: keyof(DataType);

  @Input()
  placeholder: string;

  value;
  valueChangeCallback: any;

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
