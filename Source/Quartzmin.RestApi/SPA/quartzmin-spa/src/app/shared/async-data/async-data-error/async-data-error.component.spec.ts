import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDataErrorComponent } from './async-data-error.component';

describe('AsyncDataErrorComponent', () => {
  let component: AsyncDataErrorComponent;
  let fixture: ComponentFixture<AsyncDataErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDataErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDataErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
