import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParnerComponent } from './parner.component';

describe('ParnerComponent', () => {
  let component: ParnerComponent;
  let fixture: ComponentFixture<ParnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
