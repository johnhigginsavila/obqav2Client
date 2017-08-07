import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObqaMonitoringReportPrintComponent } from './obqa-monitoring-report-print.component';

describe('ObqaMonitoringReportPrintComponent', () => {
  let component: ObqaMonitoringReportPrintComponent;
  let fixture: ComponentFixture<ObqaMonitoringReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObqaMonitoringReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObqaMonitoringReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
