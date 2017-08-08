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
  selector: 'app-cycle-report',
  templateUrl: './cycle-report.component.html',
  styleUrls: ['./cycle-report.component.css']
})
export class CycleReportComponent {
    private session:ISession;
    private program:number;
    private getCycleReport:Observable<any[]>;
    private sopiIndex:number;
    private sopiTotal:number;
    private myData:any[];
    
    constructor(private assessmentService:AssessmentService){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.getCycleReport = this.assessmentService.GetCycleReportData(this.program);
        this.sopiIndex = 0;
        this.sopiTotal = 0;

        this.lineChartData = [
            {data: [0, 0, 0, 0, 0], label: 'Target'},
            {data: [0, 0, 0, 0, 0], label: 'Performance'}
            ];
    }
// Target and performace Report line chart
public lineChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0], label: 'Target'},
    {data: [0, 0, 0, 0, 0], label: 'Performance'}
    ];
public lineChartLabels:Array<any> = ['Cycle 1', 'Cycle 2', 'Cycle 3','Cycle 4','Cycle 5'];
public lineChartOptions:any = {
    responsive: true,
    elements: {
        line: {
            tension: 0
        }
    },
    scales:{
        yAxes:[{
            ticks:{
            max:100,
            min:1
            }
        }],
        xAxes:[{
            ticks:{
            max:100,
            min:1
            }
        }]
    }
};

  public lineChartColors:Array<any> = [
    { // Green Target
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // dark grey performance
      backgroundColor: 'rgba(0, 128, 0, 0.40)',
      borderColor: 'rgba(0, 128, 0, 1)',
      pointBackgroundColor: 'rgba(0, 128, 0, 1',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 128, 0, 1'
    },
  ];

public lineChartLegend:boolean = true;
public lineChartType:string = 'line';
// Target and performace Report line chart end

    ngOnInit(){
        this.getCycleReport.subscribe(
            data => {
                this.sopiTotal = data.length;
                this.myData = data;
                this.lineChartData = [
                    {data: data[this.sopiIndex].cycleTarget, label: data[this.sopiIndex].sopi +' Target'},
                    {data: data[this.sopiIndex].cyclePerformance, label: data[this.sopiIndex].sopi +' Performance'}
                    ];
                this.lineChartLabels = data[this.sopiIndex].cyclePerformanceLabel;
            },
            err => console.log(err)
        )
    }

    loadSopi(){
        this.lineChartData = [
            {data: this.myData[this.sopiIndex].cycleTarget, label: this.myData[this.sopiIndex].sopi +' Target'},
            {data: this.myData[this.sopiIndex].cyclePerformance, label: this.myData[this.sopiIndex].sopi +' Performance'}
            ];
        this.lineChartLabels = this.myData[this.sopiIndex].cyclePerformanceLabel;
    }

    previousSopi(){
        if(this.sopiIndex !== 0 ){
            this.sopiIndex --;
            this.loadSopi();
        }
    }
    nextSopi(){
        if(this.sopiIndex !== this.sopiTotal-1 ){
            this.sopiIndex ++;
            this.loadSopi();
        }
    }
}
