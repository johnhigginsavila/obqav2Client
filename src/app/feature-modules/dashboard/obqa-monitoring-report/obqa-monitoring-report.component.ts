import { Component, OnInit, Input, OnChanges, SimpleChange, DoCheck } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { FormControl, FormControlDirective, Form } from '@angular/forms';
import { Router } from '@angular/router';

import { AssessmentService } from '../../../shared/services/assessment.service';
import { PagerService } from '../../../shared/services/pager.service';
import { IAssessmentStatus } from '../../../interfaces/assessment-status.interface';
import { IAssessmentReport } from '../../../interfaces/assessment-report.interface';
import { ISession } from '../../../interfaces/session.interface';

@Component({
  selector: 'app-obqa-monitoring-report',
  templateUrl: './obqa-monitoring-report.component.html',
  styleUrls: ['./obqa-monitoring-report.component.css']
})
export class ObqaMonitoringReportComponent implements OnInit {

  selectedCycle:number;
    selectedTerm:number;

    private assessmentReport:IAssessmentReport[];
    private cycle:any[];
    private term:any[];
    private session:ISession;
    private program:number;
    //pager Service
    private allItems:any[];


    pager:any = {};
    pagedItems:IAssessmentReport[];
    page:number;
    constructor(private assessmentService:AssessmentService, private pagerService:PagerService, private router:Router){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.page = 1;
        this.term = [
            {name:'Term 2', value:2},
            {name:'Term 3', value:3},
            {name:'Term 1', value:1},
            {name:'All', value:0}
        ]

        this.cycle = [
            {name:'cycle 1',academicYear:'2014-2015', value: 1},
            {name:'cycle 2',academicYear:'2015-2016',  value: 2},
            {name:'cycle 3',academicYear:'2016-2017',  value: 3},
            {name:'cycle 4',academicYear:'2017-2018',  value: 4},
            {name:'cycle 5',academicYear:'2018-2019',  value: 5}
        ];
        this.selectedCycle = 1;
        this.selectedTerm = 2;
    }

    
    


    ngOnInit(){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.assessmentService.GetObqaMonitoringReportPerProgramPerCyclePerTerm(this.program,this.selectedCycle,this.selectedTerm)
            .subscribe(
                data => {
                    this.assessmentReport = data;
                    this.setPage(this.page);

                },
                error => console.log(error)
            )
           
    }

    ngOnChanges(changes:{[value:number]: SimpleChange}){
        console.log(changes);
        
    }

    change(){
        this.page = 1;
        this.setPage(this.page);
        this.ngOnInit();   
    }

    isCycle(cycle:number){
        
        if(cycle == this.selectedCycle){
            return true;
        }else{
            return false;
        }
    }

    printReport(){
        console.log('Print');
        this.router.navigate(['dashboard/obqa-monitoring-report-print',this.selectedCycle,this.selectedTerm]);
    }

    setPage(page:number){
        if(page < 1 || page > this.pager.totalPages){
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.assessmentReport.length, page);
        console.log(this.pager);
        //get current page of items
        this.pagedItems = this.assessmentReport.slice(this.pager.startIndex , this.pager.endIndex + 1);
        this.page = page;
        console.log(this.pagedItems);
    }

}
