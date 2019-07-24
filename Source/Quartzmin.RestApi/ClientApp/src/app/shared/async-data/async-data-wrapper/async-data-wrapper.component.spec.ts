import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDataWrapperComponent } from './async-data-wrapper.component';

describe('AsyncDataWrapperComponent', () => {
  let component: AsyncDataWrapperComponent;
  let fixture: ComponentFixture<AsyncDataWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDataWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDataWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
