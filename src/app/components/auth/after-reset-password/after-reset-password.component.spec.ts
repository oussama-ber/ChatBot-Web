import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterResetPasswordComponent } from './after-reset-password.component';

describe('AfterResetPasswordComponent', () => {
  let component: AfterResetPasswordComponent;
  let fixture: ComponentFixture<AfterResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
