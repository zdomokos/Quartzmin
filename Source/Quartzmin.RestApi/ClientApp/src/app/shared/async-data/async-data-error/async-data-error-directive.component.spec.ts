import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDataErrorDirective } from './async-data-error-directive.component';

describe('AsyncDataErrorComponent', () => {
  let component: AsyncDataErrorDirective;
  let fixture: ComponentFixture<AsyncDataErrorDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDataErrorDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDataErrorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
