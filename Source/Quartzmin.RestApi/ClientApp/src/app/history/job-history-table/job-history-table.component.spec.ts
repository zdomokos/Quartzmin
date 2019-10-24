import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHistoryTableComponent } from './job-history-table.component';

describe('JobHistoryTableComponent', () => {
  let component: JobHistoryTableComponent;
  let fixture: ComponentFixture<JobHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
