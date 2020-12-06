import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramTooltipComponent } from './histogram-tooltip.component';

describe('HistogramTooltipComponent', () => {
  let component: HistogramTooltipComponent;
  let fixture: ComponentFixture<HistogramTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistogramTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogramTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
