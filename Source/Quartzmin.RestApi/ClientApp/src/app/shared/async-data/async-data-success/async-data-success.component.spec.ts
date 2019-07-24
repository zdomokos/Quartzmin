import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDataSuccessComponent } from './async-data-success.component';

describe('AsyncDataSuccessComponent', () => {
  let component: AsyncDataSuccessComponent;
  let fixture: ComponentFixture<AsyncDataSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDataSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDataSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
