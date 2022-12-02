import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionQcmComponent } from './revision-qcm.component';

describe('RevisionQcmComponent', () => {
  let component: RevisionQcmComponent;
  let fixture: ComponentFixture<RevisionQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionQcmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
