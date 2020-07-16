import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedAssignmentsComponent } from './submitted-assignments.component';

describe('SubmittedAssignmentsComponent', () => {
  let component: SubmittedAssignmentsComponent;
  let fixture: ComponentFixture<SubmittedAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
