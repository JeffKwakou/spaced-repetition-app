import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRevisionTypePercentageComponent } from './chart-revision-type-percentage.component';

describe('ChartRevisionTypePercentageComponent', () => {
  let component: ChartRevisionTypePercentageComponent;
  let fixture: ComponentFixture<ChartRevisionTypePercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartRevisionTypePercentageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartRevisionTypePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
