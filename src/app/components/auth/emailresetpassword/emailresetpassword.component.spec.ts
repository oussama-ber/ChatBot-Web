import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailresetpasswordComponent } from './emailresetpassword.component';

describe('EmailresetpasswordComponent', () => {
  let component: EmailresetpasswordComponent;
  let fixture: ComponentFixture<EmailresetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailresetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
