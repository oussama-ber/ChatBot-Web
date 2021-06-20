import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmuIncubatorComponent } from './smu-incubator.component';

describe('SmuIncubatorComponent', () => {
  let component: SmuIncubatorComponent;
  let fixture: ComponentFixture<SmuIncubatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmuIncubatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmuIncubatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
