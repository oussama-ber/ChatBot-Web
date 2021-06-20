import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPassportComponent } from './career-passport.component';

describe('CareerPassportComponent', () => {
  let component: CareerPassportComponent;
  let fixture: ComponentFixture<CareerPassportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerPassportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
