import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronTriggerFormComponent } from './cron-trigger-form.component';

describe('CronTriggerFormComponent', () => {
  let component: CronTriggerFormComponent;
  let fixture: ComponentFixture<CronTriggerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronTriggerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronTriggerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
