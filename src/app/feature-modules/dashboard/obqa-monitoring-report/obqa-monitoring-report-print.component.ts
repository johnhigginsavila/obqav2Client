import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
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
export class ObqaMonitoringReportPrintComponent {
    private assessmentReport:IAssessmentReport[];
    private cycle:number;
    private term:number;
    private session:ISession;
    private program:number;
    private programName:string;

    constructor(private assessmentService:AssessmentService, private route:ActivatedRoute){
        this.route.params.subscribe(params => {this.cycle = params.cycle; this.term = params.term });
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.programName = this.getProgram(this.program);
    }


    ngOnInit(){
        console.log(this.cycle)
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.programName = this.getProgram(this.program);
        this.assessmentService.GetObqaMonitoringReportPerProgramPerCyclePerTerm(this.program, this.cycle, this.term)
            .subscribe(
                data => {
                    this.assessmentReport = data;
                    console.log(data);
                },
                error => console.log(error),
                () => {
                    /*setTimeout(function() {
                        window.print();
                        window.close();
                        window.location.replace('#/dashboard/obqa-monitoring-report');
                    }, 2000);*/
                    
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

    getProgram(program:number):string{
        switch(program){
            case 1:
                return 'Chemical Engineering';
            case 2:
                return 'Civil Engineering';
            case 3:
                return 'Computer Engineering';
            case 4:
                return 'Electronics and Communication Engineering';
            case 5:
                return 'Industrial Engineering';
            case 6:
                return 'Manufacturing Engineering and Management';
            case 7:
                return 'Mechanical Engineering';
            default:
                return null;
        }
    }

}
