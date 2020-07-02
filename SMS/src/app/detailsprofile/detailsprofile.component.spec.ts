import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsprofileComponent } from './detailsprofile.component';

describe('DetailsprofileComponent', () => {
  let component: DetailsprofileComponent;
  let fixture: ComponentFixture<DetailsprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
