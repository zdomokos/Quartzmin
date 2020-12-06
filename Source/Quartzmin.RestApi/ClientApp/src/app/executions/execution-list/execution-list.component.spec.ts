import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionListComponent } from './execution-list.component';

describe('ExecutionListComponent', () => {
  let component: ExecutionListComponent;
  let fixture: ComponentFixture<ExecutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
