import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDataLoadingDirective } from './async-data-loading.directive';

describe('AsyncDataLoadingComponent', () => {
  let component: AsyncDataLoadingDirective;
  let fixture: ComponentFixture<AsyncDataLoadingDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDataLoadingDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDataLoadingDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
