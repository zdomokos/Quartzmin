import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTriggerFormComponent } from './daily-trigger-form.component';

describe('DailyTriggerFormComponent', () => {
  let component: DailyTriggerFormComponent;
  let fixture: ComponentFixture<DailyTriggerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyTriggerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTriggerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
