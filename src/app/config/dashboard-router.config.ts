import { EvidenceReportComponent } from '../feature-modules/dashboard/evidence-report/evidence-report.component';
import { ObqaMonitoringReportComponent } from '../feature-modules/dashboard/obqa-monitoring-report/obqa-monitoring-report.component';
import { ObqaMonitoringReportPrintComponent } from '../feature-modules/dashboard/obqa-monitoring-report/obqa-monitoring-report-print.component';
import { ObqaMonitoringReportStatusComponent } from '../feature-modules/dashboard/obqa-monitoring-report/obqa-monitoring-report-status.component';
import { StudentProfileSummaryComponent } from '../feature-modules/dashboard/student-profile/student-profile-summary.component';
import { StatisticsReportComponent } from '../feature-modules/dashboard/statistics-report/statistics-report.component';
import { CycleReportComponent } from '../feature-modules/dashboard/cycle-report/cycle-report.component';

import { LoginGuard } from '../shared/guards/login.guard';
import { AuthorizeGuard } from '../shared/guards/authorize.guard';

export const dashboardRouterConfig = [
    { path: 'dashboard/evidence-report', component:EvidenceReportComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'dashboard/obqa-monitoring-report', component: ObqaMonitoringReportComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'dashboard/obqa-monitoring-report-print/:cycle/:term', component: ObqaMonitoringReportPrintComponent, canActivate:[LoginGuard, AuthorizeGuard]},
    { path: 'dashboard/obqa-monitoring-report-status', component: ObqaMonitoringReportStatusComponent, canActivate: [LoginGuard, AuthorizeGuard]},
    { path: 'dashboard/student-profile-summary', component:StudentProfileSummaryComponent, canActivate: [LoginGuard, AuthorizeGuard]},
    { path: 'dashboard/statistics-report', component: StatisticsReportComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'dashboard/cycle-report', component: CycleReportComponent, canActivate:[LoginGuard, AuthorizeGuard]}
];