import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTriggerFormComponent } from './calendar-trigger-form.component';

describe('CalendarTriggerFormComponent', () => {
  let component: CalendarTriggerFormComponent;
  let fixture: ComponentFixture<CalendarTriggerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTriggerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTriggerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
