import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCardByFoldersComponent } from './chart-card-by-folders.component';

describe('ChartCardByFoldersComponent', () => {
  let component: ChartCardByFoldersComponent;
  let fixture: ComponentFixture<ChartCardByFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCardByFoldersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCardByFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
