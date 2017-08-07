import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { EvidenceReportComponent } from './evidence-report/evidence-report.component';
import { ObqaMonitoringReportComponent } from './obqa-monitoring-report/obqa-monitoring-report.component';
import { ObqaMonitoringReportPrintComponent } from './obqa-monitoring-report/obqa-monitoring-report-print.component';
import { ObqaMonitoringReportStatusComponent } from './obqa-monitoring-report/obqa-monitoring-report-status.component';
import { StudentProfileSummaryComponent } from './student-profile/student-profile-summary.component';
import { StatisticsReportComponent } from './statistics-report/statistics-report.component';
import { CycleReportComponent } from './cycle-report/cycle-report.component';

import { MainPipeModule } from '../../main-pipe/main-pipe.module';

import { dashboardRouterConfig } from '../../config/dashboard-router.config';
@NgModule({
    imports: [
        RouterModule.forChild(dashboardRouterConfig),
        CommonModule,
        ChartsModule,
        MainPipeModule,
        FormsModule
    ],
    declarations: [ 
        DashboardComponent,
        EvidenceReportComponent,
        ObqaMonitoringReportComponent,
        ObqaMonitoringReportPrintComponent,
        ObqaMonitoringReportStatusComponent,
        StudentProfileSummaryComponent,
        StatisticsReportComponent,
        CycleReportComponent 
    ],
    providers: []
}) 

export class DashboardModule {}