import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileSummaryComponent } from './student-profile-summary.component';

describe('StudentProfileSummaryComponent', () => {
  let component: StudentProfileSummaryComponent;
  let fixture: ComponentFixture<StudentProfileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfileSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
