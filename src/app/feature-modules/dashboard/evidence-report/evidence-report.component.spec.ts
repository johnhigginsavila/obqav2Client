import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceReportComponent } from './evidence-report.component';

describe('EvidenceReportComponent', () => {
  let component: EvidenceReportComponent;
  let fixture: ComponentFixture<EvidenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
