import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDataSuccessDirective } from './async-data-success.directive';

describe('AsyncDataSuccessComponent', () => {
  let component: AsyncDataSuccessDirective;
  let fixture: ComponentFixture<AsyncDataSuccessDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDataSuccessDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDataSuccessDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
