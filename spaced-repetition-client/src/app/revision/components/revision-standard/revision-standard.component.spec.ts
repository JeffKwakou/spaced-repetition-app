import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionStandardComponent } from './revision-standard.component';

describe('RevisionStandardComponent', () => {
  let component: RevisionStandardComponent;
  let fixture: ComponentFixture<RevisionStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionStandardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
