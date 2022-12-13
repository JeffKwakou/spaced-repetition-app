import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCustomComponent } from './profil-custom.component';

describe('ProfilCustomComponent', () => {
  let component: ProfilCustomComponent;
  let fixture: ComponentFixture<ProfilCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
