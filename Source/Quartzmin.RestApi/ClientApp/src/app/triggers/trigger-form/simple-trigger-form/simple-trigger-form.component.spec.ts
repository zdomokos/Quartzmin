import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTriggerFormComponent } from './simple-trigger-form.component';

describe('SimpleTriggerFormComponent', () => {
  let component: SimpleTriggerFormComponent;
  let fixture: ComponentFixture<SimpleTriggerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTriggerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTriggerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
