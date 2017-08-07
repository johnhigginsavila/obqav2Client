import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { AssessmentService } from '../../../shared/services/assessment.service';
import { GradeService } from '../../../shared/services/grade.service';
import { IAssessmentStatus } from '../../../interfaces/assessment-status.interface';
import { ISession } from '../../../interfaces/session.interface';
import { IStudentChart } from '../../../interfaces/student-chart.interface';

@Component({
  selector: 'app-student-profile-summary',
  templateUrl: './student-profile-summary.component.html',
  styleUrls: ['./student-profile-summary.component.css']
})
export class StudentProfileSummaryComponent implements OnInit {

  private studentRadarData:any;
    private session:ISession;
    private programId:number;
    private radarChartLabels:string[];
    private radarChartData:any[];
    private radarChartType:string;
    private radarChartOptions:any;
    private studentIndex:number;
    private studentTotal:number;
    private myData:any[];
    
    constructor(private gradeService:GradeService){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.programId = this.session.User.program;
        this.studentIndex = 0;
        this.radarChartData = [];
        this.myData = [];
    }
    
    ngOnInit(){
        let subscriber = this.gradeService.GetGradePerStudentToChart(this.programId)
            .subscribe(
                data => localStorage.setItem('studentData', JSON.stringify(data)),
                error => console.log(error)
            )
        setTimeout(()=>{
                subscriber.unsubscribe();
            },15000);
        this.loadStudentChart();
        // Student Profile Chart Start

        this.radarChartData.push({data: [1,1,1,1,1,1,1,1,1,1], label: 'Average'});
        this.radarChartType = 'radar';
        this.radarChartOptions = {
                responsive: true,
                scales:{
                    xAxes:[{
                        ticks:{
                        max:1
                        }            
                    }]  
                }
        } 
    }
    previousStudent(){
        if(this.studentIndex !== 0 ){
            this.studentIndex --;
            this.loadStudentChart();
        }
    }
    nextStudent(){
        if(this.studentIndex !== this.studentTotal-1 ){
            this.studentIndex ++;
            this.loadStudentChart();
        }
    }

    private loadStudentChart(){
        if(this.myData.length == 0){
            var subscriber = this.gradeService.GetGradePerStudentToChart(this.programId)
                                .subscribe(data => {
                                    this.radarChartLabels = data[this.studentIndex].labels;
                                    this.radarChartData[0] = 
                                        {data: data[this.studentIndex].data.data, label: data[this.studentIndex].data.label};
                                    
                                    this.studentTotal = data.length;
                                    console.log(this.radarChartData[0].data);
                                    this.myData = data;
                                    
                                },
                                error => {
                                    console.log(error);
                                    if(error.status == 401){
                                        console.log('You need to log in');
                                    }
                                }
                                )
            
            setTimeout(()=>{
                subscriber.unsubscribe();
            },15000);
        }else{
            this.radarChartLabels = this.myData[this.studentIndex].labels;
            this.radarChartData[0] = {
                data: this.myData[this.studentIndex].data.data, label: this.myData[this.studentIndex].data.label
            };
            this.studentTotal = this.myData.length;
        }
    }

}
