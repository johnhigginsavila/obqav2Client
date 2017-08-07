import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AssessmentService } from '../../../shared/services/assessment.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { PagerService } from '../../../shared/services/pager.service';

import { IAssessment } from '../../../interfaces/assessment.interface';
import { ISession } from '../../../interfaces/session.interface';


@Component({
  selector: 'app-manage-assessment',
  templateUrl: './manage-assessment.component.html',
  styleUrls: ['./manage-assessment.component.css']
})
export class ManageAssessmentComponent implements OnInit {

    private assessments: IAssessment[];
    private assessmentId: number;
    private addImprovementPlanForm: FormGroup;
    private getAssessments: Observable<IAssessment[]>;
    private getCsrf: Observable<any>;
    private session: ISession;
    private program: number;
    cycle: any[];
    term: any[];
    selectedCycle: number;
    selectedTerm: number;

    //pager Service
    private allItems: any[];
    pager: any = {};
    pagedItems: IAssessment[];
    page: number;
  
  constructor(private assessmentService:AssessmentService, private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private pagerService:PagerService ){
        //this.assessmentService.GetAssessmentPerProgramPerCycle(this.selectedCycle, this.program, this.selectedTerm);
        this.addImprovementPlanForm = this.formBuilder.group({
            id: new FormControl(this.assessmentId,Validators.required),
            improvementPlan: new FormControl('',Validators.required)
        });

        this.getCsrf = this.authenticationService.RequestCsrfToken();
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
        this.assessmentService.GetAssessmentPerProgram(this.program, this.selectedCycle, this.selectedTerm)
            .subscribe(
                data => {
                    this.assessments = data;
                    this.setPage(this.page);
                },
                error => {
                    console.log(error)
                }
            )

        this.getCsrf.subscribe(
            data => {
                this.addImprovementPlanForm = this.formBuilder.group({
                    id: new FormControl(this.assessmentId,Validators.required),
                    improvementPlan: new FormControl('',Validators.required),
                    _csrf:new FormControl(data._csrf,Validators.required)
                });
            },
            error => console.log(error)
        )
                
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

    getAssessmentId(id:number){
        this.assessmentId = id;
        this.getCsrf
        .subscribe(
            data => {
                this.addImprovementPlanForm = this.formBuilder.group({
                    id: new FormControl(this.assessmentId,Validators.required),
                    improvementPlan: new FormControl('',Validators.required),
                    _csrf: new FormControl(data._csrf, Validators.required)
                });
            },
            error => console.log(error)
        )
    }

    submitImprovementPlan(){
        this.assessmentService.AddImprovementPlan(this.addImprovementPlanForm.value.id, this.addImprovementPlanForm.value.improvementPlan, this.addImprovementPlanForm.value._csrf)
            .subscribe(
                response => console.log(response),
                err => console.log(err),
                () => this.ngOnInit()
            )
    }

    setPage(page:number){
        if(page < 1 || page > this.pager.totalPages){
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.assessments.length, page);
        console.log(this.pager);
        //get current page of items
        this.pagedItems = this.assessments.slice(this.pager.startIndex , this.pager.endIndex + 1);
        this.page = page;
        console.log(this.pagedItems);
    }

}
