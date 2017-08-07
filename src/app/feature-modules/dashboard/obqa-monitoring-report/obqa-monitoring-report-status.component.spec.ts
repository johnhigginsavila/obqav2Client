import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObqaMonitoringReportStatusComponent } from './obqa-monitoring-report-status.component';

describe('ObqaMonitoringReportStatusComponent', () => {
  let component: ObqaMonitoringReportStatusComponent;
  let fixture: ComponentFixture<ObqaMonitoringReportStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObqaMonitoringReportStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObqaMonitoringReportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
