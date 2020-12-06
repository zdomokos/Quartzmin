import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTableComponent } from './calendar-table.component';

describe('CalendarTableComponent', () => {
  let component: CalendarTableComponent;
  let fixture: ComponentFixture<CalendarTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
