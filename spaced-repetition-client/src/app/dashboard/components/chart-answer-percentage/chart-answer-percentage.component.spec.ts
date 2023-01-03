import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAnswerPercentageComponent } from './chart-answer-percentage.component';

describe('ChartAnswerPercentageComponent', () => {
  let component: ChartAnswerPercentageComponent;
  let fixture: ComponentFixture<ChartAnswerPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartAnswerPercentageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartAnswerPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
