import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { AssessmentService } from '../../../shared/services/assessment.service';
import { GradeService } from '../../../shared/services/grade.service';
import { IAssessmentStatus } from '../../../interfaces/assessment-status.interface';
import { ISession } from '../../../interfaces/session.interface';
import { IStudentChart } from '../../../interfaces/student-chart.interface';
import { IAssessmentReport } from '../../../interfaces/assessment-report.interface';

@Component({
  selector: 'app-obqa-monitoring-report-print',
  templateUrl: './obqa-monitoring-report-print.component.html',
  styleUrls: ['./obqa-monitoring-report-print.component.css']
})
export class ObqaMonitoringReportPrintComponent implements OnInit {

  private assessmentReport:IAssessmentReport[];
    private cycle:number;
    private term:number;
    private session:ISession;
    private program:number;


    constructor(private assessmentService:AssessmentService, private route:ActivatedRoute){
        this.route.params.subscribe(params => {this.cycle = params.cycle; this.term = params.term });
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
    }


    ngOnInit(){
        console.log(this.cycle)
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.assessmentService.GetObqaMonitoringReportPerProgramPerCyclePerTerm(this.program, this.cycle, this.term)
            .subscribe(
                data => {
                    console.log(this.term);
                    this.assessmentReport = data;
                },
                error => console.log(error),
                () => {
                    setTimeout(function() {
                        window.print();
                        window.close();
                        window.location.replace('#/dashboard/obqa-monitoring-report');
                    }, 1000);
                    
                }
            )
           
    }

    isCycle(cycle:number){
        if(cycle == this.cycle){
            return true;
        }else {
            return false;
        }
    }

}
