import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataMapComponent } from './job-data-map.component';

describe('JobDataMapComponent', () => {
  let component: JobDataMapComponent;
  let fixture: ComponentFixture<JobDataMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
