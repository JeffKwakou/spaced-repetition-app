import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionQuizComponent } from './revision-quiz.component';

describe('RevisionQuizComponent', () => {
  let component: RevisionQuizComponent;
  let fixture: ComponentFixture<RevisionQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
