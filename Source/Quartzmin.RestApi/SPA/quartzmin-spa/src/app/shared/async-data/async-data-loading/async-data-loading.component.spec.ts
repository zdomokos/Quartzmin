import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDataLoadingComponent } from './async-data-loading.component';

describe('AsyncDataLoadingComponent', () => {
  let component: AsyncDataLoadingComponent;
  let fixture: ComponentFixture<AsyncDataLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDataLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDataLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
