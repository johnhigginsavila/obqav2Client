import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObqaMonitoringReportComponent } from './obqa-monitoring-report.component';

describe('ObqaMonitoringReportComponent', () => {
  let component: ObqaMonitoringReportComponent;
  let fixture: ComponentFixture<ObqaMonitoringReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObqaMonitoringReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObqaMonitoringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
